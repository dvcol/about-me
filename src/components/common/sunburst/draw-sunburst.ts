import * as d3 from "d3";

type DefaultObject = {
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    current?: SunburstNode,
    target?: SunburstNode,
}
export type SunburstData = { name?: string, title?:string, value?: number, children?: SunburstData[] }
export type SunburstNode<T extends SunburstData = SunburstData> = d3.HierarchyRectangularNode<T> & DefaultObject

const partition = <T extends SunburstData = SunburstData>(_data: T) => {
    const root = d3.hierarchy(_data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
}


const arcVisible = (d: DefaultObject) => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
const labelVisible = (d: DefaultObject) => d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;

function isVisible(d: SunburstNode) {
    return !!+this.getAttribute("fill-opacity") || arcVisible(d.target);
}

const isClickable = (d: SunburstNode) => !!d.children?.length

const getArc = (radius: number) => d3.arc<DefaultObject>()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

const getLabelTransform = (radius: number) => (d: DefaultObject) => {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}

const getColor = (data) => d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))


export const drawSunburst = <T extends SunburstData = SunburstData>(data: T, width: number) => {
    const radius = width / 6
    const format = d3.format(",d")
    const arc = getArc(radius)
    const labelTransform = getLabelTransform(radius)

    const root = partition(data);
    const color = getColor(data)


    root.each((d: SunburstNode) => {
        d.current = d
    });

    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, width])
        .style("font", "10px sans-serif");

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
        .selectAll("path")
        .data<SunburstNode>(root.descendants().slice(1))
        .join("path")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", d => {
            if (arcVisible(d.current)) return (d.children ? 0.6 : 0.4)
            return 0
        })
        .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

        .attr("d", d => arc(d.current));

    path.filter((d) => !!d.children)
        .style("cursor", "pointer");

    path.append("title")
        .text(d => d.data.title ?? d.data.name);

    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data<SunburstNode>(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);

    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")

    const onClicked = (event: PointerEvent, p: SunburstNode) => {
        if (!isClickable(p)) return

        parent.datum(p.parent || root);

        root.each((d: SunburstNode) => {
            d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            }
        });

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {
                const i = d3.interpolate(d.current, d.target);
                return _t => {
                    d.current = i(_t)
                };
            })
            .filter(isVisible)
            .attr("fill-opacity", d => {
                if (arcVisible(d.target)) return d.children ? 0.6 : 0.4;
                return 0
            })
            .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
            .attrTween("d", d => () => arc(d.current));

        label
            .filter(isVisible)
            .transition(t)
            .attr("fill-opacity", (d: SunburstNode) => +labelVisible(d.target))
            .attrTween("transform", (d: SunburstNode) => () => labelTransform(d.current));
    }

    parent.on("click", onClicked);
    path.on("click", onClicked);

    function onMouseOver(_: MouseEvent,d:SunburstNode) {
        if (!isClickable(d)) return
        const _node = d3.select(this)
        _node.attr('fill-opacity', `${+_node.attr('fill-opacity') + 0.05}`);
    }

    function onMouseLeave(_: MouseEvent,d:SunburstNode) {
        if (!isClickable(d)) return
        const _node = d3.select(this)
        _node.attr('fill-opacity', `${+_node.attr('fill-opacity') - 0.05}`);
    }

    path.on("mouseover", onMouseOver)
        .on("mouseout", onMouseLeave);


    return svg.node();
}
import * as d3 from "d3";

import {v4 as uuid} from 'uuid'

import {isDarkTheme} from "~/utils";

enum Opacity {
    Full = 1,
    Inactive = 0.4,
    Parent = 0.75,
    Child = 0.5,
    Step = 0.2
}

type DefaultObject = {
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    current?: SunburstNode,
    target?: SunburstNode,
}
export type SunburstData = {
    id?: string,
    name?: string,
    title?: string,
    value?: number,
    children?: SunburstData[],
    depth?: number,
    color?: string,
    node?: SunburstNode<SunburstData>
}
export type SunburstNode<T extends SunburstData = SunburstData> = d3.HierarchyRectangularNode<T> & DefaultObject

const partition = <T extends SunburstData = SunburstData>(_data: T) => {
    const root = d3.hierarchy(_data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
}

export const normalizeData = (data: SunburstData) => ({
    ...data,
    id: uuid(),
    value: data.value ?? 1,
    children: data?.children?.map(normalizeData)
})


const arcVisible = (d: DefaultObject, depth = 3) => d.y1 <= depth && d.y0 >= 1 && d.x1 > d.x0;
const labelVisible = (d: DefaultObject, depth = 3) => d.y1 <= depth && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;

export const hasChildren = (d: SunburstNode) => !!d?.children?.length

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

const getColor = (data) => d3.scaleOrdinal(d3.quantize(d3.interpolateSinebow, data.children.length + 1))

const spliceNode = <T extends SunburstData = SunburstData>(p: SunburstNode<T>): T => (
    {
        ...p.data,
        node: p,
        children: p.children?.map(spliceNode)
    }
)

function setData(d) {
    d.data.depth = d.depth
    d.data.color = this.getAttribute('fill')
}

export type SunburstOptions<T extends SunburstData = SunburstData> = {
    height?: string,
    width?: string,
    viewBox?: number,
    depth?: number,
    onInit?: (data: T) => void,
    onClick?: (data: T) => void,
    onHover?: (data?: T) => void
}

export type SunburstApi<T extends SunburstData = SunburstData> = {
    svg: SVGSVGElement,
    select: (node: SunburstNode<T>) => void,
    hover: (node: SunburstNode<T>) => void,
    leave: (node: SunburstNode<T>) => void,
    back: () => void
}

export const drawSunburst = <T extends SunburstData = SunburstData>(data: T, options: SunburstOptions<T>): SunburstApi<T> => {
    const {height, width, viewBox, depth, onInit, onClick, onHover} = {
        ...options,
        viewBox: options?.viewBox ?? 1000,
        depth: options?.depth ?? 3
    }
    const radius = viewBox / 6
    const arc = getArc(radius)
    const labelTransform = getLabelTransform(radius)

    const root = partition(data);
    const color = getColor(data)


    root.each((d: SunburstNode) => {
        d.current = d
    });

    const svg = d3.create("svg")
        .attr('height', height)
        .attr('width', width)
        .attr("viewBox", [0, 0, viewBox, viewBox])
        .style("font", "10px sans-serif");

    const g = svg.append("g")
        .attr("transform", `translate(${viewBox / 2},${viewBox / 2})`);

    const path = g.append("g")
        .selectAll("path")
        .data<SunburstNode>(root.descendants().slice(1))
        .join("path")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", d => {
            if (arcVisible(d.current, depth)) return (d.children ? Opacity.Parent : Opacity.Child)
            return 0
        })
        .attr("pointer-events", d => arcVisible(d.current, depth) ? "auto" : "none")

        .attr("d", d => arc(d.current))
        .style("transition","opacity 0.5s")
        .each(setData);

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
        .attr("fill-opacity", d => +labelVisible(d.current, depth))
        .attr("transform", d => labelTransform(d.current))
        .attr('fill', () => isDarkTheme() ? 'white' : 'black')
        .text(d => d.data.name);

    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")

    function isVisible(d: SunburstNode) {
        return !!+this.getAttribute("fill-opacity") || arcVisible(d.target, depth);
    }

    const onClicked = (event: PointerEvent, p: SunburstNode<T>) => {
        onClick?.(spliceNode<T>(p))
        if (!hasChildren(p)) return

        parent.datum(p.parent || root);

        root.each((d: SunburstNode) => {
            d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            } as any
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
                if (arcVisible(d.target, depth)) return d.children ? Opacity.Parent: Opacity.Child;
                return 0
            })
            .attr("pointer-events", d => arcVisible(d.target, depth) ? "auto" : "none")
            .attrTween("d", d => () => arc(d.current));

        label
            .filter(isVisible)
            .transition(t)
            .attr("fill-opacity", (d: SunburstNode) => +labelVisible(d.target, depth))
            .attrTween("transform", (d: SunburstNode) => () => labelTransform(d.current));
    }

    parent.on("click", onClicked);
    path.on("click", onClicked);

    function onMouseOver(_: MouseEvent, d: SunburstNode<T>) {
        onHover?.(spliceNode<T>(d))
        path.filter(e => e !== d && d.ancestors().every(c => c !== e))
            .style('opacity', Opacity.Inactive)

        if (!hasChildren(d)) return
        const _node = path.filter(n => n ===d)
        _node.attr('fill-opacity', `${+_node.attr('fill-opacity') + Opacity.Step}`);
    }

    function onMouseLeave(_: MouseEvent, d: SunburstNode) {
        onHover?.()
        path.filter(e => e !== d).style('opacity', null)
        if (!hasChildren(d)) return
        const _node = path.filter(n => n ===d)
        _node.attr('fill-opacity', `${+_node.attr('fill-opacity') - Opacity.Step}`);
    }

    path.on("mouseover", onMouseOver)
        .on("mouseout", onMouseLeave);

    onInit?.(spliceNode<T>(root as SunburstNode<T>))

    return {
        svg: svg.node(),
        select: (node) => onClicked(undefined, node),
        hover: (node) => onMouseOver(undefined, node),
        leave: (node) => onMouseLeave(undefined, node),
        back: () => onClicked(undefined, parent.datum() as SunburstNode<T>)
    };
}
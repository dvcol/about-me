import * as d3 from 'd3';

import type { DefaultObject, SunburstData, SunburstNode } from '~/models';

import { isDarkTheme } from '~/utils';

export enum Animation {
  Speed = 750,
  HalfSpeed = 750 / 2,
}

export enum Opacity {
  Full = 1,
  Inactive = 0.4,
  Selected = 0.7,
  Parent = 0.75,
  Child = 0.5,
  Step = 0.2,
}

const partition = <T extends SunburstData = SunburstData>(_data: T) => {
  const root = d3
    .hierarchy(_data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);
  return d3.partition().size([2 * Math.PI, root.height + 1])(root);
};

const getColor = <T extends SunburstData = SunburstData>(data: T) => d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

export const _normalizeData = (data: SunburstData) => ({
  ...data,
  value: data.value ?? 1,
  children: data?.children?.map(_normalizeData),
});

export type ColorFunction = (key: string) => string;
const colorizeData = (
  data: SunburstData,
  {
    maxDepth = 2,
    currentDepth = 0,
    color,
    colorFn,
    colorMap,
  }: { maxDepth?: number; currentDepth?: number; color?: string; colorFn: ColorFunction; colorMap: Map<string, string> },
) => {
  if (currentDepth < maxDepth) {
    data.color = colorFn(data.name);
  } else {
    data.color = color;
  }
  colorMap.set(data.id, data.color);
  data?.children?.forEach(c => colorizeData(c, { maxDepth, currentDepth: currentDepth + 1, color: data.color, colorFn, colorMap }));
};

export const normalizeData = (_data: SunburstData) => {
  const colorMap = new Map<string, string>();
  const colorFn = getColor(_data);

  colorizeData(_data, { colorFn, colorMap });

  return { colorMap, data: _normalizeData(_data) };
};

const arcVisible = (d: DefaultObject, depth = 3, root = 0) => d.y1 <= depth && d.y0 >= root && d.x1 > d.x0;
const labelVisible = (d: DefaultObject, depth = 3, root = 1) => d.y1 <= depth && d.y0 >= root && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;

export const hasChildren = (d: SunburstNode) => !!d?.children?.length;

const getArc = (radius: number) =>
  d3
    .arc<DefaultObject>()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

const getLabelTransform = (radius: number) => (d: DefaultObject) => {
  const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
  const y = ((d.y0 + d.y1) / 2) * radius;
  return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
};

export const spliceNode = <T extends SunburstData = SunburstData>(p: SunburstNode<T>): T => ({
  ...p.data,
  node: p,
  children: p.children?.map(spliceNode),
});

function setData(d) {
  d.data.depth = d.depth;
  d.data.color = this.getAttribute('fill');
}

export type SunburstOptions<T extends SunburstData = SunburstData> = {
  height?: string;
  width?: string;
  viewBox?: number;
  depth?: number;
  onInit?: (data: T) => void;
  onClick?: (data: T) => void;
  onHover?: (data?: T) => void;
};

export type SunburstApi<T extends SunburstData = SunburstData> = {
  svg: SVGSVGElement;
  select: (node: SunburstNode<T>, navigate?: boolean) => void;
  hover: (node: SunburstNode<T>) => void;
  leave: (node: SunburstNode<T>) => void;
  back: () => void;
};

export const drawSunburst = <T extends SunburstData = SunburstData>(data: T, options: SunburstOptions<T>): SunburstApi<T> => {
  const { height, width, viewBox, depth, onInit, onClick, onHover } = {
    ...options,
    viewBox: options?.viewBox ?? 1000,
    depth: options?.depth ?? 3,
  };
  const radius = viewBox / 6;
  const arc = getArc(radius);
  const labelTransform = getLabelTransform(radius);

  const root = partition(data);
  const color = getColor(data);

  let selected: T;
  const isSelected = (n: SunburstNode) => n?.data?.id && selected?.id && selected?.id === n?.data?.id;

  const fillOpacity = (node: 'target' | 'current') => (d: SunburstNode<T>) => {
    if (!arcVisible(d[node], depth)) return 0;
    if (isSelected(d)) return Opacity.Selected;
    return d.children ? Opacity.Parent : Opacity.Child;
  };

  const arcVisibility = (node: 'target' | 'current') => (d: SunburstNode<T>) => arcVisible(d[node], depth) ? 'auto' : 'none';

  root.each((d: SunburstNode) => {
    d.current = d;
  });

  const svg = d3.create('svg').attr('height', height).attr('width', width).attr('viewBox', [0, 0, viewBox, viewBox]).style('font', '10px sans-serif');

  const g = svg.append('g').attr('transform', `translate(${viewBox / 2},${viewBox / 2})`);

  const path = g
    .append('g')
    .selectAll('path')
    .data<SunburstNode<T>>(root.descendants().slice(1) as SunburstNode<T>[])
    .join('path')
    .attr('fill', d => {
      if (d.data.color) return d.data.color;
      while (d.depth > 1) d = d.parent;
      return d.data.color ?? color(d.data.name);
    })
    .attr('fill-opacity', fillOpacity('current'))
    .attr('pointer-events', arcVisibility('current'))
    .attr('d', d => arc(d.current))
    .style('transition', 'opacity 0.5s')
    .each(setData);

  path.filter(d => !!d.children).style('cursor', 'pointer');

  path.append('title').text(d => d.data.label ?? d.data.name);

  const label = g
    .append('g')
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')
    .style('user-select', 'none')
    .selectAll('text')
    .data<SunburstNode<T>>(root.descendants().slice(1) as SunburstNode<T>[])
    .join('text')
    .attr('dy', '0.35em')
    .attr('fill-opacity', d => +labelVisible(d.current, depth))
    .attr('transform', d => labelTransform(d.current))
    .attr('fill', () => (isDarkTheme() ? 'white' : 'black'))
    .text(d => d.data.name);

  const parent = g.append('circle').datum(root).attr('r', radius).attr('fill', 'none').attr('pointer-events', 'all');

  function isVisible(d: SunburstNode) {
    return !!+this.getAttribute('fill-opacity') || arcVisible(d.target, depth);
  }

  const filterInactives = (d: SunburstNode) =>
    path.filter(e => {
      if (e === d) return false;
      if (isSelected(e)) return false;
      if (d.ancestors().some(c => c === e)) return false;
      return !selected?.node.ancestors().some(c => c === e);
    });

  const onMouseOver = (_: MouseEvent, d: SunburstNode<T>) => {
    onHover?.(spliceNode<T>(d));
    filterInactives(d).style('opacity', Opacity.Inactive);
    if (!hasChildren(d)) return;
    const _node = path.filter(n => n === d);
    _node.attr('fill-opacity', `${+_node.attr('fill-opacity') + Opacity.Step}`);
  };

  const onMouseLeave = (_: MouseEvent, d: SunburstNode) => {
    onHover?.();
    path.filter(e => e !== d).style('opacity', null);
    if (!hasChildren(d)) return;
    const _node = path.filter(n => n === d);
    _node.attr('fill-opacity', `${+_node.attr('fill-opacity') - Opacity.Step}`);
  };

  path.on('mouseover', onMouseOver).on('mouseout', onMouseLeave);

  onInit?.(spliceNode<T>(root as SunburstNode<T>));

  const onSelect = (_node: SunburstNode<T>) => {
    if (isSelected(_node)) {
      selected = undefined;
    } else if (_node?.data?.id) {
      selected = spliceNode(_node);
    }
    onClick?.(selected);
  };

  const onClicked = (event: PointerEvent, p: SunburstNode<T>, navigate?: boolean) => {
    onSelect(p);

    if (!hasChildren(p)) {
      if (!navigate) return onMouseOver(undefined, p);
      if (p.parent) p = p.parent;
    }

    parent.datum(p.parent || root);

    root.each((d: SunburstNode) => {
      d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth),
      } as any;
    });

    const transition = g.transition().duration(Animation.Speed);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path
      .transition(transition)
      .tween('data', d => {
        const i = d3.interpolate(d.current, d.target);
        return _t => {
          d.current = i(_t);
        };
      })
      .filter(isVisible)
      .attr('fill-opacity', fillOpacity('target'))
      .attr('pointer-events', arcVisibility('target'))
      .attrTween('d', d => () => arc(d.current));

    label
      .filter(isVisible)
      .transition(transition)
      .attr('fill-opacity', (d: SunburstNode) => +labelVisible(d.target, depth))
      .attrTween('transform', (d: SunburstNode) => () => labelTransform(d.current));
  };

  parent.on('click', onClicked);
  path.on('click', onClicked);

  return {
    svg: svg.node(),
    select: (node, navigate) => onClicked(undefined, node, navigate),
    hover: node => onMouseOver(undefined, node),
    leave: node => onMouseLeave(undefined, node),
    back: () => onClicked(undefined, parent.datum() as SunburstNode<T>),
  };
};

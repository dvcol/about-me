import { onDestroy, onMount } from 'svelte';

import { derived, get, writable } from 'svelte/store';

export type Offset = {
  offsetX: number;
  offsetY: number;
};

export type Boundary = {
  collapse?: number;
  expand?: number;
  collapseY?: number;
  expandY?: number;
};

export type HoverState = 'collapse' | 'expand' | false;

export const computeHoverState = (
  hover: HoverState,
  { offsetX, offsetY }: Offset,
  { collapse = 200, expand = 100, collapseY, expandY }: Boundary = {},
): HoverState => {
  if (hover !== 'collapse' && (offsetX > collapse || offsetY > (collapseY ?? collapse))) {
    return 'collapse';
  }
  if (hover !== 'expand' && offsetX < collapse && offsetY < (collapseY ?? collapse) && (offsetX > expand || offsetY > (expandY ?? expand))) {
    return 'expand';
  }
  if (hover && offsetX <= expand && offsetY <= (expandY ?? expand)) {
    return false;
  }
  return hover;
};

export const computeOffset = ({ clientX, clientY }: MouseEvent, corner?: 'top-right' | 'bottom-right') => {
  switch (corner) {
    case 'bottom-right':
      return {
        offsetX: window.innerWidth - clientX,
        offsetY: window.innerHeight - clientY,
      };
    case 'top-right':
    default:
      return {
        offsetX: window.innerWidth - clientX,
        offsetY: clientY,
      };
  }
};

export const watchMouse = ({ boundary, corner }: { boundary?: Boundary; corner?: 'top-right' | 'bottom-right' } = {}) => {
  const hover$ = writable<HoverState>('collapse');
  const expand$ = derived(hover$, _hover => _hover === 'expand');
  const collapse$ = derived(hover$, _hover => _hover === 'collapse');

  const onMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = computeOffset(event, corner);
    const hover = get(hover$);
    const _hover = computeHoverState(hover, { offsetX, offsetY }, boundary);
    if (hover !== _hover) hover$.set(_hover);
  };

  onMount(() => window.addEventListener('mousemove', onMouseMove));
  onDestroy(() => window.removeEventListener('mousemove', onMouseMove));

  return { hover$, expand$, collapse$ };
};

const getElement = (element: string | HTMLElement, container: Document | Element = document): HTMLElement =>
  typeof element == 'string' ? container.querySelector<HTMLElement>(`#${element}`) : element;

const getValueOrMax = (value: number, max: number) => {
  if (Math.abs(value) <= max) return value;
  return value > 0 ? max : -max;
};

export type TiltOptions = { target: string | HTMLElement; container?: Element | Document; inertia?: number; max?: number };

export const mouseTilt = ({
  target,
  mouse,
  max = 15,
  inertia = 30,
  container = document,
}: {
  mouse: MouseEvent;
} & TiltOptions) => {
  const element = getElement(target, container);

  if (!element) return {};
  const { height, width, x, y } = element.getBoundingClientRect();

  const rotateX = getValueOrMax(-(mouse.y - y - height / 2) / inertia, max);
  const rotateY = getValueOrMax((mouse.x - x - width / 2) / inertia, max);
  const deg = Math.atan2(mouse.y, mouse.x) * (180 / Math.PI);

  return {
    element,
    rotateX,
    rotateY,
    deg: Math.round(deg * 100) / 100,
    transform: `transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };
};

export type TiltEvent = { element: HTMLElement; mouse: MouseEvent; rotateX: number; rotateY: number; deg: number; transform: string };

export const onTilt = (node: Element, { target, container, inertia, max, delay }: { delay?: number } & TiltOptions) => {
  const onMouseMove = mouse => {
    const { element, rotateX, rotateY, deg, transform } = mouseTilt({ target, mouse, container, inertia, max });
    node.dispatchEvent(new CustomEvent<TiltEvent>('tilt', { detail: { element, mouse, rotateX, rotateY, deg, transform } }));
    if (element) element.style = transform;
  };
  const onMouseLeave = () => {
    const element = getElement(target, container);
    node.dispatchEvent(new CustomEvent<HTMLElement>('tiltEnd', { detail: element }));
    if (element) element.style = undefined;
  };

  const timeout = setTimeout(() => {
    node.addEventListener('mousemove', onMouseMove);
    node.addEventListener('mouseleave', onMouseLeave);
  }, delay ?? 0);

  return {
    destroy: () => {
      clearTimeout(timeout);
      node.removeEventListener('mousemove', onMouseMove);
      node.removeEventListener('mouseleave', onMouseLeave);
    },
  };
};

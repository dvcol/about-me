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

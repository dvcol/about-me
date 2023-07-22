import { get, writable } from 'svelte/store';

import type { Writable } from 'svelte/store';

export type MarginOptions = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
};
export type InViewActionsParams = {
  margin?: MarginOptions;
  options?: IntersectionObserverInit;
};

export type InViewEvent = CustomEvent<{ entry: IntersectionObserverEntry; count: number }>;

export const handleIntersect: (count: Writable<number>) => IntersectionObserverCallback = count => entries => {
  entries.forEach(entry => {
    const eventName = entry.isIntersecting ? 'enter' : 'leave';
    entry.target.dispatchEvent(new CustomEvent(eventName, { detail: { entry, count: get(count) } }));
    if (eventName === 'enter') count.update(_count => _count + 1);
  });
};

export const parseOptions = (init: IntersectionObserverInit = {}, { right, left, top, bottom }: MarginOptions = {}) => {
  let rootMargin: string;
  if (!init.rootMargin && (right || left || top || bottom)) {
    const marginRight = right ? right * -1 : 0;
    const marginLeft = left ? left * -1 : 0;
    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    rootMargin = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
  }
  return { rootMargin, ...init };
};

export const setObserver = (_node: Element, _observer: IntersectionObserver, { margin, options }: InViewActionsParams) => {
  if (_observer) _observer.disconnect();
  const count = writable(0);

  _observer = new IntersectionObserver(handleIntersect(count), parseOptions(options, margin));
  _observer.observe(_node);
  return _observer;
};

/**
 * Action to detect when a node element enter or exit viewport/
 *
 * examples:
 * <p
 *    use:inView={ bottom: 100 } // 100 pixels from bottom of viewport
 *    on:enter={() => console.log("enter")}
 *    on:leave={() => console.log("exit")}
 * >
 *
 * @param node the node element to which the action is attached
 * @param params Optional parameters to manage trigger zone
 */
export const inView = (node: Element, params: InViewActionsParams = {}) => {
  let observer;
  setObserver(node, observer, params);
  return {
    update(_params: InViewActionsParams) {
      setObserver(node, observer, params);
    },
    destroy() {
      if (observer) observer.disconnect();
    },
  };
};

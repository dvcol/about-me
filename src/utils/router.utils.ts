import { onDestroy, onMount } from 'svelte';
import { get } from 'svelte/store';

import { HeaderLink } from '~/data';
import { useApp } from '~/stores';

export const getRouteFragments = (url = window.location.href) => {
  const [domain, fragment] = url.split('/#/');

  if (fragment) {
    const [path, hash] = fragment.split('#');
    const base = [domain, path ?? ''].join('/#/');
    return { domain, path, hash, base };
  }

  const [_domain, hash] = domain.split('#');
  const base = `${domain}/#/`;

  return { domain: _domain, hash, base };
};

export type ScrollOptions = { options?: ScrollIntoViewOptions; container?: Element | Document };
export const scrollToHash = (hash: HeaderLink, { options = { behavior: 'smooth' }, container = get(useApp().app$) }: ScrollOptions = {}) => {
  const header = container?.querySelector(`#${hash}`);
  if (header) header.scrollIntoView(options);
  return header;
};

export const scrollToUrkHash = (url?: string, options: ScrollOptions = {}) => {
  const { base, hash } = getRouteFragments(url);
  const link = Object.values(HeaderLink).find(l => l.toString() === hash);
  const header = scrollToHash(link, options);
  return { base, hash, header };
};

export const useHashAnchors = ({ replaceState = false }: { replaceState?: boolean } = {}) => {
  const listener = (e?: HashChangeEvent) => {
    const { base } = scrollToUrkHash(e?.newURL, { container: get(app$) });

    if (replaceState) window.history.pushState(undefined, undefined, base);
  };

  onMount(() => window.addEventListener('hashchange', listener));
  onDestroy(() => window.removeEventListener('hashchange', listener));
};

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

export const scrollToHash = (
  url?: string,
  { options = { behavior: 'smooth' }, container = get(useApp().app$) }: { options?: ScrollIntoViewOptions; container?: Element | Document } = {},
) => {
  const { base, hash } = getRouteFragments(url);
  if (Object.values(HeaderLink).map(String).includes(hash)) {
    const header = container?.querySelector(`#${hash}`);
    if (header) header.scrollIntoView(options);
    return { base, hash, header };
  }
  return { base, hash };
};

export const useHashAnchors = ({ replaceState = false }: { replaceState?: boolean } = {}) => {
  const listener = (e?: HashChangeEvent) => {
    const { base } = scrollToHash(e?.newURL, { container: get(app$) });

    if (replaceState) window.history.pushState(undefined, undefined, base);
  };

  onMount(() => window.addEventListener('hashchange', listener));
  onDestroy(() => window.removeEventListener('hashchange', listener));
};

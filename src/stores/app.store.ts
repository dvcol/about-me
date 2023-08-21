import { writable } from 'svelte/store';

const app$ = writable<HTMLDivElement>(null);
const container$ = writable<HTMLElement | Document>(null);

export const useApp = () => ({
  app$,
  container$,
});

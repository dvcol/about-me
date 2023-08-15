import { writable } from 'svelte/store';

const app$ = writable<HTMLDivElement>(null);

export const useApp = () => ({
  app$,
});

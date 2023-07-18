import { writable } from 'svelte/store';

import type { SunburstApi } from '~/components';
import type { SunburstData } from '~/models';

export const selected$ = writable<SunburstData>();
export const visible$ = writable<SunburstData[]>([]);
export const hover$ = writable<string[]>([]);

export const nodes$ = writable<Map<string, SunburstData>>(new Map());
export const colors$ = writable<Map<string, string>>(new Map());

export const onSelect$ = writable<SunburstApi['select']>();
export const onHover$ = writable<SunburstApi['hover']>();
export const onLeave$ = writable<SunburstApi['hover']>();

export const useSkillsStore = () => ({ selected$, visible$, hover$, nodes$, colors$, onSelect$, onHover$, onLeave$ });

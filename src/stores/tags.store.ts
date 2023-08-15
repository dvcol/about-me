import { writable } from 'svelte/store';

import type { Tag } from '~/models';

const selected$ = writable<Tag>();
const hover$ = writable<string[]>([]);

const onSelect = (tag: Tag) => {
  selected$.update(_was => {
    if (_was?.id === tag.id) return null;
    return tag;
  });
};

const onEnter = (tag: Tag) => {
  hover$.set([tag.id]);
};

const onLeave = (tag: Tag) => {
  hover$.update(_was => _was.filter(id => id !== tag.id));
};

export const useTagsStore = () => ({ selected$, onSelect, hover$, onEnter, onLeave });

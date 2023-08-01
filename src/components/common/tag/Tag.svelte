<script lang="ts">
  import Chip from '@smui/chips';

  import { createEventDispatcher } from 'svelte';

  import { derived } from 'svelte/store';

  import type { Tag } from '~/models';

  import { Opacity } from '~/components/index.js';
  import { useSkillsStore } from '~/stores';
  import { useTagsStore } from '~/stores/tags.store';

  let className: string = '';
  export { className as class };

  let styles: string = '';
  export { styles as style };

  export let tag: Tag;
  export let hover: boolean = null;
  export let selected: boolean = null;

  const dispatch = createEventDispatcher();
  const onEvent = (event: 'select' | 'enter' | 'leave', _tag: Tag) => dispatch(event, _tag);

  const { selected$, hover$ } = useSkillsStore();
  const { selected$: tagSelected$, hover$: tagHover$ } = useTagsStore();

  const isSelected$ = derived(
    [selected$, tagSelected$],
    ([_selected, _tagSelected]) => selected ?? [_selected?.id, _tagSelected?.id].includes(tag.id),
  );
  const isHovered$ = derived([hover$, tagHover$], ([_hover, _tagHover]) => {
    if (hover !== null) return hover;
    if (!_hover.length && !_tagHover.length) return true;
    return _hover?.includes(tag.id) || _tagHover?.includes(tag.id);
  });
</script>

{#if tag}
  <div class="chip">
    <Chip
      class={className}
      ripple={false}
      chip={tag}
      style={`
          color: ${tag?.color ?? ''};
          ${!$isHovered$ ? `opacity: ${$isSelected$ !== false ? Opacity.Full : Opacity.Child}` : ''};
          ${$isSelected$ ? `border-color: ${tag.color?.replace(')', ', 0.3)')}` : ''};
          ${$isSelected$ ? `background-color: ${tag.color?.replace(')', ', 0.15)')};` : ''}
          ${styles}
         `}
      on:SMUIChip:interaction={onEvent('select', tag)}
      on:mouseenter={onEvent('enter', tag)}
      on:mouseleave={onEvent('leave', tag)}
    >
      <slot />
    </Chip>
  </div>
{/if}

<style lang="scss">
  .chip {
    :global(.mdc-chip) {
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      transition: opacity 0.5s, background-color 0.3s, border-color 0.15s;
    }
  }
</style>

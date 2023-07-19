<script lang="ts">
  import Chip from '@smui/chips';

  import { createEventDispatcher } from 'svelte';

  import type { Tag } from '~/models';

  import { Opacity } from '~/components/index.js';

  let className: string = '';
  export { className as class };

  export let tag: Tag;
  export let hover: boolean;
  export let selected: boolean;

  const dispatch = createEventDispatcher();
  const onEvent = (event: 'select' | 'enter' | 'leave', _tag: Tag) => dispatch(event, _tag);
</script>

{#if tag}
  <div class="chip">
    <Chip
      class={className}
      ripple={false}
      chip={tag}
      style={`
          color: ${tag?.color ?? ''};
          ${!hover ? `opacity: ${selected !== false ? Opacity.Full : Opacity.Child}` : ''};
          ${selected ? `border-color: ${tag.color?.replace(')', ', 0.3)')}` : ''};
          ${selected ? `background-color: ${tag.color?.replace(')', ', 0.15)')};` : ''}
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

<script lang="ts">
  import Chip from '@smui/chips';

  import { createEventDispatcher } from 'svelte';

  import type { Skill } from '~/models';

  import { Opacity } from '~/components/index.js';

  export let skill: Skill;
  export let hover: boolean;
  export let selected: boolean;

  const dispatch = createEventDispatcher();
  const onEvent = (event: 'select' | 'enter' | 'leave', _skill: Skill) => dispatch(event, _skill);
</script>

{#if skill}
  <Chip
    class="chip"
    ripple={false}
    chip={skill}
    style={`
          color: ${skill?.color ?? ''};
          ${!hover ? `opacity: ${selected ? Opacity.Full : Opacity.Child}` : ''};
          ${selected ? `border-color: ${skill.color?.replace(')', ', 0.3)')}` : ''};
          ${selected ? `background-color: ${skill.color?.replace(')', ', 0.15)')};` : ''}
         `}
    on:SMUIChip:interaction={onEvent('select', skill)}
    on:mouseenter={onEvent('enter', skill)}
    on:mouseleave={onEvent('leave', skill)}
  >
    <slot />
  </Chip>
{/if}

<style lang="scss">
  :global(.mdc-chip) {
    border-color: transparent;
    border-style: solid;
    border-width: 1px;
    transition: opacity 0.5s, background-color 0.3s, border-color 0.15s;
  }
</style>

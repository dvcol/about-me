<script lang="ts">
  import { writable } from 'svelte/store';

  import type { TileProps } from '~/models';

  import { inView } from '~/actions';

  import { Tile } from '~/components/index.js';

  export let sticky = false;

  export let id: string = 'timeline-tile';
  export let index: number;

  export let tile: TileProps = null;

  const open$ = writable(false);
</script>

<div
  data-timeline-id={`${id}-${index}`}
  class="column"
  class:sticky
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={() => {
    $open$ = true;
  }}
>
  <span>OO</span>
  {#if tile}
    <Tile class={`timeline-tile ${$open$ ? 'timeline-tile--open' : ''}`} {...tile} />
  {/if}
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    width: 50%;
    padding: 2rem 0;

    &.sticky {
      position: sticky;
      top: 0;
    }

    @media screen and (max-width: breakpoint.$laptop + px) {
      width: 100%;
      padding: 0.5rem 0;

      &.sticky {
        position: relative;
      }
    }

    :global .timeline-tile {
      opacity: 0;
      transition: opacity 1s;
      will-change: opacity;

      &--open {
        opacity: 1;
      }
    }
  }
</style>

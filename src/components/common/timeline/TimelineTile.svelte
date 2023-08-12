<script lang="ts">
  import { writable } from 'svelte/store';

  import type { TileProps } from '~/models';

  import { inView } from '~/actions';

  import { Tile } from '~/components/index.js';

  export let sticky = false;
  export let flip = false;

  export let id: string = 'timeline-tile';
  export let index: number;

  export let tile: TileProps = null;

  const open$ = writable(false);
</script>

<div
  data-timeline-id={`${id}-${index}`}
  class="timeline-tile column"
  class:sticky
  class:flip
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={() => {
    $open$ = true;
  }}
>
  <div class="row">
    <span>OO</span>
    {#if tile}
      <Tile class={`timeline-tile-card ${$open$ ? 'timeline-tile-card--open' : ''}`} {...tile} />
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .row {
    display: flex;
    flex-direction: row;

    .flip & {
      flex-direction: row-reverse;

      @media screen and (max-width: breakpoint.$laptop + px) {
        flex-direction: row;
      }
    }
  }

  .column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }

  .timeline-tile {
    width: 50%;
    padding: 2rem 0;
    overflow-x: hidden;

    :global(.tile) {
      display: flex;
      flex: 1 1 auto;
      width: 100%;
    }

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

    :global .timeline-tile-card {
      opacity: 0;
      transition: opacity 1s, translate 1s ease-in-out;
      will-change: opacity, translate;
      translate: 50%;

      &--open {
        opacity: 1;
        translate: 0 !important;
      }
    }

    &.flip {
      :global .timeline-tile-card {
        translate: -50%;

        @media screen and (max-width: breakpoint.$laptop + px) {
          translate: 50%;
        }
      }
    }
  }
</style>

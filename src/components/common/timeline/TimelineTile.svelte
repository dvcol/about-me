<script lang="ts">
  import type { TileProps } from '~/models';

  import { Tile } from '~/components';
  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let index: number;
  export let parent: TileProps;
  export let children: TileProps[] = [];

  const mobile$ = matchesBreakPoint(BreakPoints.laptop);
</script>

<div data-timeline-id={`tile-row-${index}`} class="row">
  <div data-timeline-id={`tile-parent-${index}`} class="column sticky">
    <Tile {...parent} />
  </div>
  {#each children as child, childIndex}
    {#if childIndex && !$mobile$}
      <div data-timeline-id={`tile-parent-${index}-child-${childIndex}-empty`} class="column">
        <!--  empty cell  -->
      </div>
    {/if}
    <div data-timeline-id={`tile-parent-${index}-child-${childIndex}`} class="column">
      <Tile {...child} />
    </div>
  {/each}
</div>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .row {
    display: flex;
    flex-flow: row wrap;
    padding: 1rem;

    @media screen and (max-width: breakpoint.$laptop + px) {
      padding: 0;
    }
  }

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
  }
</style>

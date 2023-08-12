<script lang="ts">
  import type { TileProps } from '~/models';

  import { TimelineTile } from '~/components';
  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let index: number;
  export let parent: TileProps;
  export let children: TileProps[] = [];

  const mobile$ = matchesBreakPoint(BreakPoints.laptop);
</script>

<div data-timeline-id={`tile-row-${index}`} class="row">
  <TimelineTile {index} tile={parent} sticky flip />
  {#if !$mobile$}
    <TimelineTile id={`timeline-tile-spacer`} {index} />
  {/if}
  {#each children as child, childIndex}
    {#if !$mobile$}
      <TimelineTile id={`timeline-tile-${index}-spacer`} index={childIndex} flip />
    {/if}
    <TimelineTile id={`timeline-tile-${index}-child`} index={childIndex} tile={child} />
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
</style>

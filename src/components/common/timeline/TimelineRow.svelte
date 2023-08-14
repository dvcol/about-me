<script lang="ts">
  import type { TimelineTileProps } from '~/models';

  import { TimelineTile } from '~/components';

  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let index: number;
  export let last = false;
  export let first = index === 0;
  export let parent: TimelineTileProps;
  export let children: TimelineTileProps[] = [];

  const mobile$ = matchesBreakPoint(BreakPoints.laptop);
</script>

<div data-timeline-id={`tile-row-${index}`} class="row">
  <TimelineTile {index} tile={parent} flip {first} />
  {#if !$mobile$}
    <TimelineTile id={`timeline-tile-spacer`} {index} duration={parent.duration} address={parent.address} {first} />
  {/if}
  {#each children as child, childIndex}
    {#if !$mobile$}
      <TimelineTile id={`timeline-tile-${index}-spacer`} index={childIndex} duration={child.duration} address={child.address} secondary flip {last} />
    {/if}
    <TimelineTile id={`timeline-tile-${index}-child`} index={childIndex} tile={child} secondary marker {last} />
  {/each}
</div>

<style lang="scss">
  @use 'src/theme/breakpoint';

  .row {
    display: flex;
    flex-flow: row wrap;

    @media screen and (max-width: breakpoint.$laptop + px) {
      padding: 0;
    }
  }
</style>

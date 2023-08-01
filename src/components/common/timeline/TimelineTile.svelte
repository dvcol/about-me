<script lang="ts">
  import type { TileProps } from '~/models';

  import { Tile } from '~/components';
  import { BreakPoints, matchesBreakPoint } from '~/utils';

  export let parent: TileProps;
  export let children: TileProps[] = [];

  const mobile = matchesBreakPoint(BreakPoints.laptop);
</script>

<div class="column">
  <Tile {...parent} />
</div>
{#each children as child, index}
  {#if index && !mobile}
    <div class="column">
      <!--  empty cell  -->
    </div>
  {/if}
  <div class="column">
    <Tile {...child} />
  </div>
{/each}

<style lang="scss">
  @use 'src/styles/breakpoint';

  .column {
    max-width: calc(50dvw - 1rem);

    @media screen and (max-width: breakpoint.$laptop + px) {
      max-width: calc(100dvw - 2rem);
    }
  }
</style>

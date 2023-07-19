<script lang="ts">
  import type { Project } from '~/models';
  import type { RequireAtLeastOne } from '~/utils';

  import { Tile } from '~/components/common';

  export let stack: RequireAtLeastOne<{ left: Project; right: Project }>[] = [];
</script>

{#each stack as { left, right }}
  <div class="stack">
    <Tile class="stack-tile stack-tile-left" {...left} />
    <Tile class="stack-tile stack-tile-right" {...right} />
  </div>
{/each}

<style lang="scss">
  .stack {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    :global {
      .stack-tile {
        display: flex;
        flex: 1 1 50%;
        flex-direction: column;
        align-self: stretch;
        max-width: 50vw;
      }
    }
  }
</style>

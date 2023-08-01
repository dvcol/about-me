<script lang="ts">
  import type { TileProps } from '~/models';

  import { Tile } from '~/components';

  export let parent: TileProps;
  export let children: TileProps[] = [];
</script>

<div class="column">
  <Tile {...parent} />
</div>
{#each children as child, index}
  {#if index}
    <div class="column">
      <!--  empty cell  -->
    </div>
  {/if}
  <div class="column">
    <Tile {...child} />
  </div>
{/each}

<style lang="scss">
  .column {
    max-width: calc(50dvw - 1rem);
  }
</style>

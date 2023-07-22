<script lang="ts">
  import type { StackTileProps } from '~/models';
  import type { RequireAtLeastOne } from '~/utils';

  import StackTile from '~/components/common/stack/StackTile.svelte';

  export let stacks: RequireAtLeastOne<StackTileProps>[] = [];
</script>

<div class="stack">
  {#each stacks as stack}
    <StackTile {...stack} />
  {/each}
</div>

<style lang="scss">
  .stack {
    display: flex;
    flex-direction: column;
  }
</style>

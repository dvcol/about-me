<script lang="ts">
  import type { Project } from '~/models';
  import type { RequireAtLeastOne } from '~/utils';

  import StackTile from '~/components/common/stack/StackTile.svelte';

  export let stack: RequireAtLeastOne<{ left: Project; right: Project }>[] = [];
</script>

<div class="stack">
  {#each stack as { left, right }}
    <StackTile {left} {right} />
  {/each}
</div>

<style lang="scss">
  .stack {
    display: flex;
    flex-direction: column;
  }
</style>

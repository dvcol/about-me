<script lang="ts">
  import { _ } from 'svelte-i18n';

  export let id: string = null;
  export let title: string;
</script>

<h1 {id}>
  {$_(title)}
  <slot />
</h1>

<style lang="scss">
  h1 {
    font-size: 3em;
  }
</style>

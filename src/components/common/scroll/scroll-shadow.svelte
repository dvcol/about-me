<script lang="ts">
  import { writable } from 'svelte/store';

  const scrollable$ = writable<boolean>(false);
  const offset$ = writable(0);

  export const onScroll = (scrollContainer: HTMLDivElement) => {
    if (!scrollContainer) return;

    const max = scrollContainer.scrollHeight - scrollContainer.offsetHeight;

    $scrollable$ = !!max;
    $offset$ = max ? scrollContainer.scrollTop / max : 0;
  };
</script>

<div class="scroll-container">
  {#if $scrollable$}
    <div class="shadow shadow-top" style:opacity={$offset$} />
    <div class="shadow shadow-bottom" style:opacity={1 - $offset$} />
  {/if}
  <slot />
</div>

<style lang="scss">
  .shadow {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 10px;
    background: red;
    transition: opacity 10ms;
  }

  .scroll-container {
    position: relative;

    .shadow-top {
      top: 0;
      background: linear-gradient(180deg, rgb(0 0 0 / 20%), transparent);
    }

    .shadow-bottom {
      bottom: 0;
      background: linear-gradient(0deg, rgb(0 0 0 / 20%), transparent);
    }
  }
</style>

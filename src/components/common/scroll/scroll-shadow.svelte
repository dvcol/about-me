<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  const scrollable$ = writable<boolean>(false);
  const offset$ = writable(0);

  const offsetTop$ = derived([scrollable$, offset$], ([_scrollable, _offset]) => {
    return _scrollable ? _offset : 0;
  });

  const offsetBottom$ = derived([scrollable$, offset$], ([_scrollable, _offset]) => {
    return _scrollable ? 1 - _offset : 0;
  });

  let container: HTMLElement;

  const dispatch = createEventDispatcher();
  export const onScroll = (event: WheelEvent) => {
    if (!container) return;
    const { scrollHeight, offsetHeight, scrollTop } = container;

    const max = scrollHeight - offsetHeight;

    $scrollable$ = !!max;
    $offset$ = max ? scrollTop / max : 0;

    dispatch('scroll', { event, scrollable: $scrollable$, offset: $offset$ });
  };

  onMount(() => {
    if (container?.parentElement) container.parentElement.style.position = 'relative';
  });
</script>

<div class="scroll-container" bind:this={container} on:scroll={onScroll}>
  <div class="shadow shadow-top" style:opacity={$offsetTop$}>
    <!--  top shadow  -->
  </div>
  <div class="shadow shadow-bottom" style:opacity={$offsetBottom$}>
    <!--  bottom shadow  -->
  </div>
  <slot />
</div>

<style lang="scss">
  .scroll-container {
    overflow: auto;
    overflow-x: hidden;
  }

  .shadow {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 10px;
    background: red;
    transition: opacity 500ms;
  }

  .shadow-top {
    top: 0;
    background: linear-gradient(180deg, rgb(0 0 0 / 20%), transparent);
  }

  .shadow-bottom {
    bottom: 0;
    background: linear-gradient(0deg, rgb(0 0 0 / 20%), transparent);
  }
</style>

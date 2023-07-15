<script lang="ts">
  import { derived, writable } from 'svelte/store';

  const scrollable$ = writable<boolean>(false);
  const offset$ = writable(0);

  export const onScroll = (scrollContainer: HTMLDivElement) => {
    if (!scrollContainer) return;

    const max = scrollContainer.scrollHeight - scrollContainer.offsetHeight;

    $scrollable$ = !!max;
    $offset$ = max ? scrollContainer.scrollTop / max : 0;
  };

  const offsetTop$ = derived([scrollable$, offset$], ([_scrollable, _offset]) => {
    return _scrollable ? _offset : 0;
  });
  const offsetBottom$ = derived([scrollable$, offset$], ([_scrollable, _offset]) => {
    return _scrollable ? 1 - _offset : 0;
  });
</script>

<div class="scroll-container">
  <div class="shadow shadow-top" style:opacity={$offsetTop$}>
    <!--  top shadow  -->
  </div>
  <div class="shadow shadow-bottom" style:opacity={$offsetBottom$}>
    <!--  bottom shadow  -->
  </div>
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
    transition: opacity 500ms;
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

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { derived, writable } from 'svelte/store';

  let className: string = '';
  export { className as class };

  export let horizontal: boolean = false;
  export let transition: number = 100;

  const scrollable$ = writable<boolean>(false);
  export const hide = () => {
    $scrollable$ = false;
  };

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
    const { scrollHeight, offsetHeight, scrollTop, scrollWidth, offsetWidth, scrollLeft } = container;

    const max = (horizontal ? scrollWidth : scrollHeight) - (horizontal ? offsetWidth : offsetHeight);

    $scrollable$ = !!max;
    $offset$ = max ? (horizontal ? scrollLeft : scrollTop) / max : 0;

    dispatch('scroll', { event, scrollable: $scrollable$, offset: $offset$ });
  };

  onMount(() => {
    if (container?.parentElement) container.parentElement.style.position = 'relative';
  });
</script>

<div
  class={[className, 'scroll-container'].filter(Boolean).join(' ')}
  bind:this={container}
  on:scroll={onScroll}
  style={`
    overflow-x: ${horizontal ? 'auto' : 'hidden'};
    overflow-y: ${horizontal ? 'hidden' : 'auto'};
  `}
>
  <div
    class="shadow shadow-top"
    style={`
         opacity: ${$offsetTop$};
         transition: opacity ${transition}ms;
         width: ${horizontal ? '10px' : '100%'};
         height: ${horizontal ? '100%' : '20px'};
         background: linear-gradient(${horizontal ? '90deg' : '180deg'}, rgb(0 0 0 / 20%), transparent)
       `}
  >
    <!--  top shadow  -->
  </div>
  <div
    class="shadow shadow-bottom"
    style={`
         opacity: ${$offsetBottom$};
         transition: opacity ${transition}ms;
         width: ${horizontal ? '10px' : '100%'};
         height: ${horizontal ? '100%' : '20px'};
         background: linear-gradient(${horizontal ? '280deg' : '0deg'}, rgb(0 0 0 / 20%), transparent)
       `}
  >
    <!--  bottom shadow  -->
  </div>
  <slot />
</div>

<style lang="scss">
  .scroll-container {
    overflow: auto;
  }

  .shadow {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 10px;
    background: red;
  }

  .shadow-top {
    top: 0;
    left: 0;
  }

  .shadow-bottom {
    right: 0;
    bottom: 0;
  }
</style>

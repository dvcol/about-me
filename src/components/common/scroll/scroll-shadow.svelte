<script lang="ts">
  let className: string = '';
  export { className as class };

  export let horizontal: boolean = false;
  export let size = '';
</script>

<div
  class:scroll-container={true}
  class:scroll-horizontal={horizontal}
  style:--scroll-shadow-size={size}
  style:--scroll-direction={horizontal ? 'left' : 'top'}
  class={className}
>
  <slot />
</div>

<style lang="scss">
  @use 'src/theme/z-index';

  .scroll-container {
    mask-image: linear-gradient(
      to var(--scroll-direction, top),
      black,
      black,
      transparent 0,
      black var(--scroll-shadow-size, 2rem),
      black calc(100% - var(--scroll-shadow-size, 2rem)),
      transparent
    );

    &.scroll-horizontal {
      overflow-x: auto;
      padding-inline: var(--scroll-shadow-size, 2rem);
    }

    &:not(.scroll-horizontal) {
      overflow-y: auto;
      padding-block: var(--scroll-shadow-size, 2rem);
    }
  }
</style>

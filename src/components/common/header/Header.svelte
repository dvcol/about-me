<script lang="ts">
  import { writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import { inView } from '~/actions';

  export let id: string = null;
  export let title: string;

  const visible$ = writable(false);
</script>

<h1
  {id}
  class="header"
  class:header--visible={$visible$}
  use:inView={{ margin: { bottom: 100 } }}
  on:enter={() => {
    $visible$ = true;
  }}
>
  <span class="header-text">
    {$_(title)}<span class="header-text-dot">.</span>
  </span>
  <slot />
</h1>

<style lang="scss">
  @use 'src/theme/colors';
  @use 'src/theme/breakpoint';

  @keyframes cursor {
    0% {
      opacity: 0;
    }

    40% {
      opacity: 0;
    }

    50% {
      opacity: 0.8;
    }

    90% {
      opacity: 0.8;
    }

    100% {
      opacity: 0;
    }
  }

  .header {
    margin: 4rem 0;
    font-size: 4em;
    scroll-margin-top: 4rem;

    &-text {
      &-dot {
        color: colors.$secondary;
      }

      &::after {
        display: inline-block;
        width: 4px;
        height: 2.75rem;
        margin-left: 0.25rem;
        background: colors.$primary;
        opacity: 0;
        animation: cursor 1s infinite;
        content: '';
      }
    }

    &::after {
      display: flex;
      width: 6rem;
      height: 3px;
      margin-top: 2rem;
      background-color: colors.$primary;
      transition: scale 1s;
      content: '';
      will-change: scale;
      scale: 0.5;
    }

    &--visible::after {
      scale: 1;
    }

    @media screen and (max-width: breakpoint.$fhd + px) {
      margin: 2rem 0;
      font-size: 3em;
      scroll-margin-top: 2rem;
    }

    @media screen and (max-width: breakpoint.$hd + px) {
      margin: 1rem 0;
      scroll-margin-top: 1rem;
    }

    @media screen and (max-width: breakpoint.$tablet + px) {
      font-size: 2.5em;

      &::after {
        margin-top: 1rem;
      }
    }
  }
</style>

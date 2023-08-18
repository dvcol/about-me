<script lang="ts">
  import { writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import { inView } from '~/actions';
  import TypeWriter from '~/components/common/text/TypeWriter.svelte';

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
  <TypeWriter value={$_(title)} />
  <slot />
</h1>

<style lang="scss">
  @use 'src/theme/colors';
  @use 'src/theme/breakpoint';

  .header {
    margin: 4rem 0;
    font-size: 4em;
    scroll-margin-top: 4rem;

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

      &-text::after {
        height: 2.5rem;
      }
    }

    @media screen and (max-width: breakpoint.$hd + px) {
      margin: 1rem 0;
      scroll-margin-top: 1rem;
    }

    @media screen and (max-width: breakpoint.$tablet + px) {
      font-size: 2.5em;

      &-text::after {
        height: 2rem;
      }

      &::after {
        margin-top: 1rem;
      }
    }
  }
</style>

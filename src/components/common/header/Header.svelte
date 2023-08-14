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
  {$_(title)}
  <slot />
</h1>

<style lang="scss">
  @use 'src/theme/colors';

  .header {
    font-size: 3em;

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
  }
</style>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { writable } from 'svelte/store';

  import { inView } from '~/actions';
  import { HeaderLink } from '~/data';
  import { scrollToHash, scrollToUrkHash, useHashAnchors } from '~/utils/router.utils';

  useHashAnchors();

  let timeout: number;
  onMount(() => {
    timeout = setTimeout(scrollToUrkHash, 100);
  });
  onDestroy(() => clearTimeout(timeout));

  const visible$ = writable(false);
</script>

<nav
  id="{HeaderLink.Home}}"
  class="hero-nav"
  class:visible={$visible$}
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={() => {
    $visible$ = true;
  }}
>
  <ul>
    <li><a on:click={() => scrollToHash(HeaderLink.Projects)} href={null}>Projects</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.Skills)} href={null}>Skills</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.AboutMe)} href={null}>About Me</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.Contact)} href={null}>Contact</a></li>
  </ul>
</nav>

<style lang="scss">
  @use 'src/theme/colors';

  .hero-nav {
    padding: 2rem;
    opacity: 0;
    transition: opacity 1s;
    will-change: opacity;

    &.visible {
      opacity: 1;
    }

    ul {
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      color: colors.$grey;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.25s;
      will-change: color;
    }

    li {
      position: relative;
      padding-bottom: 0.75rem;
      overflow: hidden;
      font-weight: bold;
      min-inline-size: 3rem;

      &::after {
        position: absolute;
        background-color: colors.$primary;
        transition: scale 0.25s;
        content: '';
        will-change: scale;
        inset-inline: 0;
        inset-block-end: 0;
        block-size: 3px;
        scale: 0;
      }

      &:hover,
      &:focus {
        &::after {
          scale: 1;
        }

        a {
          color: colors.$white;
        }
      }
    }
  }
</style>

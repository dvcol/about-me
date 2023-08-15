<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { HeaderLink } from '~/data';
  import { scrollToHash, scrollToUrkHash, useHashAnchors } from '~/utils/router.utils';

  useHashAnchors();

  let timeout: number;
  onMount(() => {
    timeout = setTimeout(scrollToUrkHash, 100);
  });
  onDestroy(() => clearTimeout(timeout));
</script>

<nav id="{HeaderLink.Home}}" class="hero-nav">
  <ul>
    <li><a on:click={() => scrollToHash(HeaderLink.Projects)} href={null}>Projects</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.Skills)} href={null}>Skills</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.AboutMe)} href={null}>About Me</a></li>
    <li><a on:click={() => scrollToHash(HeaderLink.Contact)} href={null}>Contact</a></li>
  </ul>
</nav>

<style lang="scss">
  nav {
    padding: 2rem;

    ul {
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      min-inline-size: 3rem;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      opacity: 0.7;
    }
  }
</style>

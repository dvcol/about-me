<script lang="ts">
  import { onMount } from 'svelte';

  import { HeaderLink } from '~/data';
  import { getRouteFragments, scrollToHash, useHashAnchors } from '~/utils/router.utils';

  useHashAnchors();

  const { base } = getRouteFragments();

  onMount(() => setTimeout(scrollToHash, 100));
</script>

<nav id="{HeaderLink.Home}}" class="hero-nav">
  <ul>
    <li><a href={`${base}#${HeaderLink.Projects}`}>Projects</a></li>
    <li><a href={`${base}#${HeaderLink.Skills}`}>Skills</a></li>
    <li><a href={`${base}#${HeaderLink.AboutMe}`}>About Me</a></li>
    <li><a href={`${base}#${HeaderLink.Contact}`}>Contact</a></li>
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
    }

    a {
      color: inherit;
      font-weight: 500;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      opacity: 0.7;
    }
  }
</style>

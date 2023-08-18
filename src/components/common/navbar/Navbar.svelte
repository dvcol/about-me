<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  import { derived, writable } from 'svelte/store';

  import { _ } from 'svelte-i18n';

  import { inView } from '~/actions';
  import { HeaderLink } from '~/data';
  import { BreakPoints, scrollToHash, scrollToUrlHash, useHashAnchors, useMediaQuery } from '~/utils';
  import { watchMouse } from '~/utils/mouse.utils';

  let className: string = '';
  export { className as class };

  export let delay = 0;

  useHashAnchors();

  let hashTimeout: number;
  let scrollTimeout: number;
  onMount(() => {
    hashTimeout = setTimeout(scrollToUrlHash, 100);
  });
  onDestroy(() => {
    clearTimeout(hashTimeout);
    clearTimeout(scrollTimeout);
  });

  const visible$ = writable(false);
  const scrolled$ = writable(false);
  const inFlight$ = writable(false);

  const headers$ = derived(scrolled$, _scrolled => {
    const _header = [HeaderLink.Projects, HeaderLink.Skills, HeaderLink.AboutMe, HeaderLink.Contact];
    if (_scrolled) _header.unshift(HeaderLink.Home);
    return _header;
  });

  const isMobile$ = useMediaQuery(`(max-width: ${BreakPoints.mobile}px)`);
  const { expand$, collapse$ } = watchMouse({
    boundary: $isMobile$
      ? {
          collapse: 80,
          expand: 40,
          collapseY: 250,
          expandY: 225,
        }
      : {
          collapse: 140,
          expand: 80,
          collapseY: 320,
          expandY: 260,
        },
  });

  const dispatch = createEventDispatcher();
  $: dispatch('scrolled', $scrolled$);
</script>

<nav
  id={HeaderLink.Home}
  class={['hero-nav', className].filter(Boolean).join(' ')}
  class:visible={$visible$}
  class:side-bar={$scrolled$}
  class:expand={$expand$}
  class:collapse={$collapse$}
  class:in-flight={$inFlight$}
  use:inView={{ margin: { bottom: 200 } }}
  on:enter={({ detail: { count } }) => {
    if (count > 0 && $collapse$) {
      $visible$ = true;
      $scrolled$ = false;
      return;
    }

    $visible$ = false;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      $scrolled$ = false;
      $visible$ = true;
    }, (count ? 500 : delay) + ($headers$.length - 2) * 100);
  }}
  on:leave={() => {
    $scrolled$ = true;
    $inFlight$ = true;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      $inFlight$ = false;
    }, 100);
  }}
>
  <ul>
    {#each $headers$ as header, index}
      <li style={`--index: ${index}`}>
        <a on:click={() => scrollToHash(header)} href={null} tabindex="0">
          {$_(`navbar.header.${header}`)}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @use 'src/theme/colors';
  @use 'src/theme/z-index';
  @use 'src/theme/breakpoint';

  .hero-nav {
    min-height: 1.875rem;
    padding: 2rem 0;

    @media screen and (max-width: breakpoint.$mobile + px) {
      padding: 1rem 0.5rem;
    }

    ul {
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
      list-style: none;

      @media screen and (max-width: breakpoint.$mobile + px) {
        gap: 1rem;
      }
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
      z-index: z-index.$layer-ui;
      padding-bottom: 0.75rem;
      overflow: hidden;
      font-weight: bold;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.5s, translate 0.5s, top 0.5s;
      transition-delay: calc(var(--index) * 100ms);
      pointer-events: none;
      will-change: opacity;
      translate: 0 -50%;

      @media screen and (max-width: breakpoint.$mobile + px) {
        padding-bottom: 0.5rem;
      }

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

        @media screen and (max-width: breakpoint.$mobile + px) {
          block-size: 2px;
        }
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

    &.visible {
      li {
        opacity: 1;
        pointer-events: all;
        translate: 0;
      }
    }

    &.side-bar {
      ul {
        position: fixed;
        top: calc(55px + var(--offset-scroll, 0px));
        right: 0;
        z-index: z-index.$layer-ui;
        flex-direction: column;
        gap: 0.75rem;
        align-items: flex-end;
        margin: 1.5rem;
        overflow: hidden;
        text-align: end;

        @media screen and (max-width: breakpoint.$mobile + px) {
          top: calc(45px + var(--offset-scroll, 0px));
          gap: 0.5rem;
          margin: 0.75rem;
        }

        li {
          padding: 0.25rem 0.75rem;
          overflow: hidden;

          &::after {
            inset: 0 0 0 calc(100% - 2px);
            block-size: 100%;
          }

          a {
            display: inline-block;
            opacity: 1;
            transition: opacity 1s, translate 1s;
            translate: 0;
          }

          @media screen and (max-width: breakpoint.$mobile + px) {
            padding: 0.25rem 0.5rem;
          }
        }
      }

      &.in-flight {
        ul,
        li,
        a {
          transition: none;
        }
      }

      &.collapse {
        pointer-events: none;

        li::after {
          scale: 0;
        }

        ul li a {
          opacity: 0;
          translate: 100%;
        }
      }

      &.expand {
        pointer-events: none;

        li::after {
          scale: 0;
        }

        ul li a {
          opacity: 0.5;
          translate: calc(100% - 0.5ch);
        }
      }
    }
  }
</style>

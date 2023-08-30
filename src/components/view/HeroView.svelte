<script lang="ts">
  import ChevronSvg from 'line-md/svg/chevron-double-down.svg?component';
  import { onDestroy, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import AvatarSvg from '~/assets/avatar.svg?component';
  import LogoSvg from '~/assets/dvco.svg?component';

  import { Navbar, Section, WordTicker } from '~/components';
  import { HeaderLink } from '~/data';
  import { useApp } from '~/stores';
  import { scrollToHash } from '~/utils';
  import { onTilt } from '~/utils/mouse.utils';

  const visible$ = writable(false);
  const inFlight$ = writable(false);
  const tilted$ = writable(false);
  const scrolled$ = writable(false);

  const { app$ } = useApp();

  const flipped$ = writable(false);
  const flipping$ = writable(false);

  let timeoutFlip: number;

  const flipped = () => {
    clearTimeout(timeoutFlip);
    timeoutFlip = setTimeout(() => {
      $inFlight$ = false;
    }, 250);
  };

  const flipping = () => {
    clearTimeout(timeoutFlip);
    timeoutFlip = setTimeout(() => {
      $flipping$ = false;
      $flipped$ = !$flipped$;
      flipped();
    }, 250);
  };

  const flip = () => {
    $inFlight$ = true;
    $flipping$ = true;
    flipping();
  };

  let visibleTimeout: number;
  let inFlightTimeout: number;
  let flipInterval: number;

  onMount(() => {
    flipInterval = setInterval(flip, 20000);
    visibleTimeout = setTimeout(() => {
      $inFlight$ = true;
      $visible$ = true;

      inFlightTimeout = setTimeout(() => {
        $inFlight$ = false;
      }, 750);
    }, 100);
  });

  onDestroy(() => {
    clearTimeout(visibleTimeout);
    clearTimeout(inFlightTimeout);
    clearInterval(flipInterval);
  });
</script>

<Section fullscreen>
  <svelte:fragment slot="header">
    <Navbar
      class="hero-header"
      delay={300}
      on:scrolled={e => {
        $scrolled$ = e.detail;
      }}
    />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero-main">
      <div
        role="img"
        class="gradient-bg"
        use:onTilt={{ target: 'hero-main-logo', container: $app$, delay: 850 }}
        on:tilt={() => {
          $tilted$ = true;
        }}
      >
        <!-- background -->
      </div>
      <div class="hero-main-ticker">
        <div class="hero-main-logo-container">
          <div
            id="hero-main-logo"
            role="button"
            tabindex="0"
            class="hero-main-logo"
            class:visible={$visible$}
            class:in-flight={$inFlight$}
            class:tilted={$tilted$}
            class:flipping={$flipping$}
            on:click={flip}
            on:keydown={flip}
          >
            {#if $flipped$}
              <AvatarSvg class="hero-main-logo-avatar" />
            {:else}
              <LogoSvg class="hero-main-logo-dvco" />
            {/if}
          </div>
        </div>
        <div class="hero-main-text" class:visible={$visible$}>
          <div>{$_('hero.title')}</div>
          <WordTicker
            words={[
              $_('hero.ticker.developer'),
              { value: $_('hero.ticker.frontend'), color: '#eb6700' },
              { value: $_('hero.ticker.fullstack'), color: '#f3ce00' },
              { value: $_('hero.ticker.devops'), color: '#4295d2' },
              { value: $_('hero.ticker.extension'), color: '#34a853' },
            ]}
          />
        </div>
      </div>
      <dkv class="hero-main-footer" class:visible={$visible$ && !$scrolled$}>
        <a on:click={() => scrollToHash(HeaderLink.Projects)} href={null}>
          <ChevronSvg style="scale: 1.5 1.25;" />
        </a>
      </dkv>
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/z-index';
  @use 'src/theme/breakpoint';

  @keyframes bounce {
    0% {
      transform: translateY(0%);
    }

    50% {
      transform: translateY(50%);
    }

    100% {
      transform: translateY(0);
    }
  }

  .hero-main {
    display: flex;
    justify-content: center;
    height: calc(100dvh - 2 * 94px);
    padding-bottom: 94px;

    &-footer {
      position: absolute;
      bottom: 2rem;
      opacity: 0;
      translate: 0 -20%;
      transition: opacity 1s, translate 1s, scale 1s;
      animation: bounce 4s ease infinite;
      animation-delay: 1000ms;
      scale: 0.9;

      a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      &.visible {
        opacity: 0.5;
        translate: 0;
        transition-delay: 500ms;

        &:hover,
        &:focus {
          opacity: 0.8;
          scale: 1;
          animation-play-state: paused;
        }
      }
    }

    &-text {
      opacity: 0;
      scale: 0;
      transition: opacity 1s ease-in, scale 1s;

      &.visible {
        opacity: 1;
        scale: 1;
      }

      @media screen and (max-width: breakpoint.$mobile + px) {
        padding-top: 1.5rem;
      }
    }

    &-logo {
      display: flex;
      width: fit-content;
      height: fit-content;
      margin: 2rem auto;
      overflow: hidden;
      background: linear-gradient(320deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 20%) 100%);
      border-radius: 50%;
      outline: none;
      box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
      transform: rotateY(90deg);
      transform-origin: bottom;
      opacity: 0;
      backdrop-filter: blur(10px);
      transition: transform 0.75s ease-out, scale 0.75s, opacity 0.75s;
      will-change: transform, scale, opacity;
      scale: 0.5;
      -webkit-tap-highlight-color: transparent;

      &-container {
        perspective: 1000px;
      }

      &-svg {
        display: flex;
      }

      :global &-avatar {
        width: 16rem;
        height: 16rem;
        border-radius: 50%;
      }

      :global &-dvco {
        width: 12rem;
        height: 12rem;
        padding: 2rem;
      }

      &.visible {
        transform: rotateX(0) rotateY(0) rotateZ(0);
        opacity: 1;
        scale: 1;

        &:hover,
        &:focus {
          cursor: pointer;
        }
      }

      &.tilted {
        transform-origin: center;

        &.in-flight {
          transition: transform 0.25s ease-out, scale 2s, opacity 0.75s;
        }

        &:not(.in-flight) {
          transition: transform 2s ease-out, scale 2s, opacity 0.75s;
        }

        &:hover,
        &:focus {
          transform: rotateX(0) rotateY(0) rotateZ(0);
          scale: 1.05;
        }
      }

      &.flipping {
        :global(svg) {
          opacity: 0;
          transition: 1s ease-in;
        }

        transform: rotateX(0) rotateY(90deg) rotateZ(0) !important;
        transition: transform 0.25s ease-in, scale 2s, opacity 0.5s !important;
      }
    }

    &-ticker {
      z-index: z-index.$in-front;
      align-self: center;
      font-size: 3em;
    }
  }

  .gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100dvw;
    height: 100dvh;
    background: linear-gradient(-45deg, #ff5600, #ff0667, #8400f8, #1d00ff);
    background-size: 400% 400%;
    animation: gradient 20s ease-in-out infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0 0;
    }

    20% {
      background-position: 0 50%;
    }

    40% {
      background-position: 100% 50%;
    }

    50% {
      background-position: 100% 75%;
    }

    60% {
      background-position: 100% 50%;
    }

    80% {
      background-position: 0 50%;
    }

    100% {
      background-position: 0 0;
    }
  }
</style>

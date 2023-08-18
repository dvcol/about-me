<script lang="ts">
  import { onMount } from 'svelte';

  import { writable } from 'svelte/store';

  import LogoSvg from '~/assets/dvco.svg?component';
  import { Navbar, Section, WordTicker } from '~/components';

  const visible$ = writable(false);

  onMount(() =>
    setTimeout(() => {
      $visible$ = true;
    }, 100),
  );
</script>

<Section fullscreen>
  <svelte:fragment slot="header">
    <Navbar class="hero-header" delay={300} />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero-main">
      <div class="gradient-bg">
        <!-- background -->
      </div>
      <div class="hero-main-ticker">
        <div class="hero-main-logo" class:visible={$visible$}>
          <LogoSvg />
        </div>
        <div class="hero-main-text" class:visible={$visible$}>
          <div>Dinh-Van Colomban</div>
          <WordTicker
            words={[
              'Developer',
              { value: 'Frontend', color: '#eb6700' },
              { value: 'Fullstack', color: '#f3ce00' },
              { value: 'Devops', color: '#4295d2' },
            ]}
          />
        </div>
      </div>
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/z-index';

  :global(.section) {
    padding-bottom: 2rem;
  }

  .hero-main {
    display: flex;
    justify-content: center;
    height: calc(100dvh - 2 * 94px);
    padding-bottom: 94px;

    &-text {
      opacity: 0;
      scale: 0;
      transition: opacity 1s ease-in, scale 1s;

      &.visible {
        opacity: 1;
        scale: 1;
      }
    }

    &-logo {
      display: flex;
      width: fit-content;
      height: fit-content;
      margin: 2rem auto;
      overflow: hidden;
      background-color: rgb(255 255 255 / 20%);
      border-radius: 50%;
      box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
      transform: rotateY(90deg);
      transform-origin: bottom;
      opacity: 0;
      backdrop-filter: blur(10px);
      transition: transform 0.75s ease-out, scale 0.75s, opacity 0.75s;
      scale: 0.5;

      &.visible {
        transform: rotateY(0);
        opacity: 1;
        scale: 1;
      }

      :global(svg) {
        width: 12rem;
        height: 12rem;
        padding: 2rem;
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
    background: linear-gradient(-45deg, #ed9278, #e73c7e, #2c04a2, #c5b8b8);
    background-size: 400% 400%;
    animation: gradient 20s ease-in-out infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
</style>

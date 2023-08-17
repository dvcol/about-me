<script lang="ts">
  import { Navbar, Section, WordTicker } from '~/components';
</script>

<Section fullscreen>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero-main">
      <div class="gradient-bg" />
      <div class="hero-main-ticker">
        <div>Dinh-Van Colomban</div>
        <WordTicker words={[{ value: 'Frontend', color: '#e74c3c' }, { value: 'Fullstack', color: '#8e44ad' }, 'Devops']} />
      </div>
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/z-index';

  .hero-main {
    display: flex;
    justify-content: center;
    height: calc(100dvh - 2 * 94px);
    padding-bottom: 94px;

    .hero-main-ticker {
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
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
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

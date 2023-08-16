<script lang="ts">
  import { Navbar, Section, WordTicker } from '~/components';
</script>

<Section>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero-main">
      <div class="hero-main-ticker">
        <div>Dinh-Van Colomban</div>
        <WordTicker words={[{ value: 'Frontend', color: '#e74c3c' }, { value: 'Fullstack', color: '#8e44ad' }, 'Devops']} />
      </div>
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  .hero-main {
    display: flex;
    justify-content: center;
    height: calc(100dvh - 2 * 94px);
    padding-bottom: 94px;

    .hero-main-ticker {
      align-self: center;
      font-size: 3em;
    }
  }
</style>

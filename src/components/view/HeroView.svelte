<script>
  import { Header, Section } from '~/components';
</script>

<Section>
  <svelte:fragment slot="header">
    <Header title="hero.title" />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero">
      This is the Hero main
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  .hero {
    height: 100dvh;
  }
</style>

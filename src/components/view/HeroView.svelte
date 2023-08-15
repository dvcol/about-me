<script lang="ts">
  import { Navbar, Section } from '~/components';
</script>

<Section>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="hero-main">
      This is the Hero main
      <slot />
    </div>
  </svelte:fragment>
</Section>

<style lang="scss">
  .hero-main {
    height: 100dvh;
  }
</style>

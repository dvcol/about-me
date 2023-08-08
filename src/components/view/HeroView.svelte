<script>
  import { _ } from 'svelte-i18n';

  import { Section } from '~/components';
</script>

<Section>
  <div slot="header">
    {$_('hero.title')}
  </div>
  <div slot="main">
    <div class="hero">This is the Hero main</div>
  </div>
</Section>

<style lang="scss">
  .hero {
    height: 100dvh;
  }
</style>

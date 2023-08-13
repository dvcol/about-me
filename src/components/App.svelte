<script lang="ts">
  import { I18nProvider, LazyComponent } from '~/components/common';
</script>

<article id="app">
  <I18nProvider />
  <LazyComponent component={import('~/components/view/HeroView.svelte')}>
    <slot name="hero" />
  </LazyComponent>
  <LazyComponent component={import('~/components/view/ProjectsView.svelte')}>
    <slot name="projects" />
  </LazyComponent>
  <LazyComponent component={import('~/components/view/SkillsView.svelte')}>
    <slot name="skills" />
  </LazyComponent>
  <LazyComponent component={import('~/components/view/TimelineView.svelte')}>
    <slot name="timeline" />
  </LazyComponent>
  <LazyComponent component={import('~/components/view/ContactView.svelte')}>
    <slot name="contact" />
  </LazyComponent>
</article>

<style lang="scss" global>
  @use 'src/styles/smui-dark';

  // TODO - implement light theme
  // @import 'src/styles/smui-light.css' screen and (prefers-color-scheme: light);

  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    scroll-behavior: smooth;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
</style>

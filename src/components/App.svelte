<script lang="ts">
  import { onMount } from 'svelte';

  import { I18nProvider, LazyComponent } from '~/components/common';
  import { useApp } from '~/stores';

  export let container: string = null;

  const { app$, container$ } = useApp();

  onMount(() => {
    if (container) {
      $container$ = document.getElementById(container);
    } else {
      $container$ = document;
    }
  });
</script>

<article id="app" bind:this={$app$}>
  <I18nProvider>
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
  </I18nProvider>
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

  /* Avoid ugly unbalanced word wrap */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  /* Avoid ugly orphan word wrap */
  p,
  li,
  figcaption {
    text-wrap: pretty;
  }

  @media (prefers-reduced-motion: reduce) {
    :has(:target) {
      scroll-behavior: smooth;
      scroll-padding-top: 3rem;
    }
  }
</style>

<script lang="ts">
  import { I18nProvider } from '~/components/common';
  import { ContactView, HeroView, ProjectsView, SkillsView, TimelineView } from '~/components/view';
</script>

<article id="app">
  <I18nProvider />
  <HeroView />
  <ProjectsView />
  <SkillsView />
  <TimelineView />
  <ContactView />
</article>

<style lang="scss" global>
  @import 'src/styles/smui-dark.css' screen;

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

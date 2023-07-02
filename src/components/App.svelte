<script lang="ts">
    import {I18nProvider} from "~/components/common";
    import {ContactView, HeroView, ProjectsView, SkillsView, TimelineView} from "~/components/view";
</script>

<!-- SMUI Styles -->
<link
        rel="stylesheet"
        href="node_modules/svelte-material-ui/themes/svelte.css"
        media="(prefers-color-scheme: light)"
/>
<link
        rel="stylesheet"
        href="node_modules/svelte-material-ui/themes/svelte-dark.css"
        media="screen and (prefers-color-scheme: dark)"
/>

<article id="app">
    <I18nProvider/>
    <HeroView/>
    <ProjectsView/>
    <SkillsView/>
    <TimelineView/>
    <ContactView/>
</article>

<style lang="scss">
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

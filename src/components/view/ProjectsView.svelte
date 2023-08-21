<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { StackTileProps } from '~/models';

  import { Header, Section, Stack, WordScroll } from '~/components';
  import { AboutMeTile, DvColTile, HeaderLink } from '~/data';
  import { SynologyDownloadTile } from '~/data/projects.data';

  const stacks: StackTileProps[] = [SynologyDownloadTile, AboutMeTile, DvColTile];
</script>

<Section>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.Projects} title="projects.title" />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="text">
      <WordScroll text={$_('data_projects.introduction')} />
    </div>

    <Stack {stacks} />

    <slot />
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/colors';

  .text {
    margin: 5rem 0;
    padding: 0 8dvw;
    color: colors.$tertiary;
    font-size: 1.5em;

    @media screen and (max-width: breakpoint.$mobile + px) {
      margin-top: 3rem;
      padding: 0 6dvw;
      font-size: 1.25em;
    }
  }
</style>

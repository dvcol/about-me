<script lang="ts">
  import type { StackTileProps } from '~/models';

  import { Header, Section, Stack } from '~/components';
  import { AboutMeTile, DvColTile, HeaderLink } from '~/data';
  import { SynologyDownloadTile } from '~/data/projects.data';

  const stacks: StackTileProps[] = [SynologyDownloadTile, AboutMeTile, DvColTile];
</script>

<Section>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.Projects} title="projects.title" />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <Stack {stacks} />

    <slot />
  </svelte:fragment>
</Section>

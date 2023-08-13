<script lang="ts">
  import type { StackTileProps } from '~/models';

  import { Header, Section, Stack } from '~/components';
  import { SynologyDownloadTile } from '~/data/projects.data';
  import { StackTilePrimary } from '~/models';

  const stacks: StackTileProps[] = [
    SynologyDownloadTile,
    { left: SynologyDownloadTile.right, right: SynologyDownloadTile.left, primary: StackTilePrimary.Left },
    SynologyDownloadTile,
  ];
</script>

<Section>
  <svelte:fragment slot="header">
    <Header title="projects.title" />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <Stack {stacks} />

    <slot />
  </svelte:fragment>
</Section>

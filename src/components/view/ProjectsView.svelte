<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { StackTileProps } from '~/models';

  import { Section, Stack } from '~/components';
  import { SynologyDownloadTile } from '~/data/projects.data';
  import { StackTilePrimary } from '~/models';

  const stacks: StackTileProps[] = [
    SynologyDownloadTile,
    { left: SynologyDownloadTile.right, right: SynologyDownloadTile.left, primary: StackTilePrimary.Left },
    SynologyDownloadTile,
    { left: SynologyDownloadTile.right, right: SynologyDownloadTile.left, primary: StackTilePrimary.Left },
    SynologyDownloadTile,
    { left: SynologyDownloadTile.right, right: SynologyDownloadTile.left, primary: StackTilePrimary.Left },
  ];
</script>

<Section>
  <div slot="header">
    {$_('projects.title')}
  </div>
  <div slot="main">
    <Stack {stacks} />
  </div>
</Section>

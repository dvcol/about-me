<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { Project } from '~/models';

  import { Section, Tile } from '~/components';
  import { educations } from '~/data/education.data';
  import { jobs } from '~/data/jobs.data.js';

  const mapTileProps = <T extends Project>({ title, subtitle, description, media, links, tags }: T = {}) => ({
    title,
    subtitle,
    description,
    media,
    links,
    tags,
  });
</script>

<Section>
  <div slot="header">
    {$_('timeline.title')}
  </div>
  <div slot="main">
    {#each jobs as job}
      <Tile {...mapTileProps(job.employer)} />
      {#each job.missions as mission}
        <Tile {...mapTileProps(mission)} />
      {/each}
    {/each}

    {#each educations as education}
      <Tile {...mapTileProps(education.employer)} />
      {#each education.diplomas as diploma}
        <Tile {...mapTileProps(diploma)} />
      {/each}
    {/each}
  </div>
</Section>

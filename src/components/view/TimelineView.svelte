<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { Job } from '~/models/index.js';

  import { Section, Tile } from '~/components';
  import { jobs } from '~/data/jobs.data.js';

  const timeline: Job[] = jobs;
</script>

<Section>
  <div slot="header">
    {$_('timeline.title')}
  </div>
  <div slot="main">
    {#each jobs as job}
      <Tile {...job.employer} />
      {#each job.missions as mission}
        <Tile {...mission} />
      {/each}
    {/each}
  </div>
</Section>

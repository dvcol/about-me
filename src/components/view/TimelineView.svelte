<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { Project, TimelineTileProps } from '~/models';

  import { Section, TimelineRow } from '~/components';
  import { educations } from '~/data/education.data';
  import { jobs } from '~/data/jobs.data.js';

  const mapTileProps = <T extends Project>({ title, subtitle, description, logo, links, tags, duration, address }: T = {}): TimelineTileProps => ({
    title,
    subtitle,
    description,
    logo,
    links,
    tags,
    duration,
    address,
  });
</script>

<Section>
  <div slot="header">
    {$_('timeline.title')}
  </div>
  <div slot="main">
    <div class="column">
      {#each jobs as job, index}
        <TimelineRow {index} parent={mapTileProps(job.employer)} children={job.missions.map(mapTileProps)} />
      {/each}
    </div>

    <div class="column">
      {#each educations as education, index}
        <TimelineRow {index} parent={mapTileProps(education.institution)} children={education.diplomas.map(mapTileProps)} />
      {/each}
    </div>
  </div>
</Section>

<style lang="scss">
  @use 'src/theme/breakpoint';

  .column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
</style>

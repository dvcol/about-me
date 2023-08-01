<script lang="ts">
  import { _ } from 'svelte-i18n';

  import type { Project, TileProps } from '~/models';

  import { Section, TimelineTile } from '~/components';
  import { educations } from '~/data/education.data';
  import { jobs } from '~/data/jobs.data.js';

  const mapTileProps = <T extends Project>({ title, subtitle, description, media, links, tags }: T = {}): TileProps => ({
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
    <div class="grid">
      {#each jobs as job}
        <TimelineTile parent={mapTileProps(job.employer)} children={job.missions.map(mapTileProps)} />
      {/each}
    </div>

    <div class="grid">
      {#each educations as education}
        <TimelineTile parent={mapTileProps(education.institution)} children={education.diplomas.map(mapTileProps)} />
      {/each}
    </div>
  </div>
</Section>

<style lang="scss">
  @use 'src/styles/breakpoint';

  .grid {
    display: grid;
    grid-auto-rows: minmax(14rem, auto);
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;

    @media screen and (max-width: breakpoint.$laptop + px) {
      grid-template-columns: 1fr;
    }
  }
</style>

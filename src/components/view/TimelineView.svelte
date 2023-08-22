<script lang="ts">
  import type { Project, TimelineTileProps } from '~/models';

  import { Header, Paragraph, Section, TimelineRow } from '~/components';
  import { HeaderLink } from '~/data';
  import { educations } from '~/data/education.data';
  import { jobs } from '~/data/jobs.data.js';

  const mapTileProps = <T extends Project>({
    title,
    subtitle,
    description,
    logo,
    links,
    tags,
    duration,
    address,
    meta,
  }: T = {}): TimelineTileProps => ({
    title,
    subtitle,
    description,
    logo,
    links,
    tags,
    duration,
    address,
    meta,
  });
</script>

<Section>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.AboutMe} title="timeline.title" />
    <Paragraph text={'timeline.introduction'} />
  </svelte:fragment>

  <svelte:fragment slot="main">
    <div class="column">
      {#each jobs as job, index}
        <TimelineRow {index} parent={mapTileProps(job.employer)} children={job.missions.map(mapTileProps)} />
      {/each}
    </div>

    <div class="column">
      {#each educations as education, index}
        <TimelineRow
          {index}
          first={false}
          last={index === educations.length - 1}
          parent={mapTileProps(education.institution)}
          children={education.diplomas.map(mapTileProps)}
        />
      {/each}
    </div>

    <slot />
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/breakpoint';

  .column {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
  }
</style>

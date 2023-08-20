<script lang="ts">
  import type { StackTileProps } from '~/models';

  import { Header, Section, Stack, WordScroll } from '~/components';
  import { AboutMeTile, DvColTile, HeaderLink } from '~/data';
  import { SynologyDownloadTile } from '~/data/projects.data';

  const stacks: StackTileProps[] = [SynologyDownloadTile, AboutMeTile, DvColTile];

  const text = `
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 Ultricies leo integer malesuada nunc vel risus.
 Turpis egestas pretium aenean pharetra. Viverra mauris in aliquam sem fringilla.
 Est ullamcorper eget nulla facilisi etiam dignissim diam quis.
 Risus ultricies tristique nulla aliquet enim. Nam aliquam sem et tortor consequat id porta nibh venenatis. Proin fermentum leo vel orci porta non.
 Eu volutpat odio facilisis mauris sit amet. Sollicitudin tempor id eu nisl nunc mi ipsum faucibus.
 Pellentesque eu tincidunt tortor aliquam. Dui vivamus arcu felis bibendum ut tristique et.
 Risus in hendrerit gravida rutrum. Purus in mollis nunc sed id.
 Fames ac turpis egestas integer eget. Nunc sed augue lacus viverra vitae congue eu consequat ac.
 Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat.
 Ut enim blandit volutpat maecenas volutpat.
 Blandit cursus risus at ultrices. Lectus mauris ultrices eros in cursus.
 `;
</script>

<Section>
  <svelte:fragment slot="header">
    <Header id={HeaderLink.Projects} title="projects.title" />
  </svelte:fragment>
  <svelte:fragment slot="main">
    <div class="text">
      <WordScroll {text} />
    </div>

    <Stack {stacks} />

    <slot />
  </svelte:fragment>
</Section>

<style lang="scss">
  @use 'src/theme/breakpoint';
  @use 'src/theme/colors';

  .text {
    margin-top: 5rem;
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

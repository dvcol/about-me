<script lang="ts">
  import { _ } from 'svelte-i18n';

  import { Section } from '~/components';
  import Stack from '~/components/common/stack/Stack.svelte';
  import {
    animation,
    backgroundScript,
    contentScript,
    dndKit,
    mv3,
    react,
    reactMui,
    reactRedux,
    reactRouter,
    reactTransitionGroup,
    redux,
    rxjs,
    syncStorage,
    webEx,
    webexMessaging,
    webpack,
  } from '~/data';
  import { Project } from '~/models';

  const SynologyDownloadProject: Project = new Project({
    title: 'Synology Download',
    subtitle: 'Chrome extension to manage Synology NAS',
    description: `
    <p>
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
    </p>

    <p>
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
    </p>
    `,
    tags: {
      skills: [react, webEx, animation, webpack, redux],
      hidden: [
        reactMui,
        reactRedux,
        reactRouter,
        reactTransitionGroup,
        dndKit,
        mv3,
        contentScript,
        backgroundScript,
        webexMessaging,
        syncStorage,
        rxjs,
      ],
    },
    links: {
      store: 'https://chrome.google.com/webstore/detail/download-station-client-f/ebbdkledlkjpgbbmmopgbnnjmklnkcef',
      github: 'https://github.com/dvcol/synology-download',
      website: 'https://dvcol.github.io/#/synology/demo',
    },
  });

  const SynologyDownloadProjectMedia = new Project({
    media: { url: 'synology_demo.gif', title: 'Synology Demo' },
  });

  const stack = [{ left: SynologyDownloadProject, right: SynologyDownloadProjectMedia }];
</script>

<Section>
  <div slot="header">
    {$_('projects.title')}
  </div>
  <div slot="main">
    <Stack {stack} />
  </div>
</Section>

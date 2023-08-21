import type { StackTileProps } from '~/models';

import {
  animation,
  backgroundScript,
  contentScript,
  context,
  dndKit,
  eslint,
  microFrontend,
  mobileWebApp,
  motion,
  multiFramework,
  multipleRuntime,
  mv3,
  preCaching,
  react,
  reactMui,
  reactRedux,
  reactRouter,
  reactTransitionGroup,
  redux,
  remoteEntry,
  rxjs,
  sass,
  shell,
  solid,
  stylelint,
  svelte,
  svelteI18n,
  svelteMui,
  syncStorage,
  typescript,
  vite,
  vitePwa,
  webComponent,
  webEx,
  webexMessaging,
  webpack,
  workbox,
} from '~/data/skills.data';
import { MimeType, Project, StackTilePrimary } from '~/models';

const SynologyDownloadDescription = new Project({
  title: 'data_projects.synology_download.description.title',
  subtitle: 'data_projects.synology_download.description.subtitle',
  description: 'data_projects.synology_download.description.description',
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
      sass,
      typescript,
      eslint,
      stylelint,
    ],
  },
  links: {
    store: 'https://chrome.google.com/webstore/detail/download-station-client-f/ebbdkledlkjpgbbmmopgbnnjmklnkcef',
    github: 'https://github.com/dvcol/synology-download',
    website: 'https://dvcol.github.io/#/synology/demo',
  },
});

const SynologyDownloadMeda = new Project({
  media: {
    url: 'assets/video/synology-download-preview.hevc.mp4',
    type: MimeType.MP4,
    title: 'data_projects.synology_download.media.title',
    subtitle: 'data_projects.synology_download.media.subtitle',
    link: { label: 'data_projects.synology_download.media.link.label', url: SynologyDownloadDescription.links.store },
  },
});

export const SynologyDownloadTile: StackTileProps = {
  left: SynologyDownloadDescription,
  right: SynologyDownloadMeda,
  primary: StackTilePrimary.Right,
};

const AboutDescription = new Project({
  title: 'data_projects.about_me.description.title',
  subtitle: 'data_projects.about_me.description.subtitle',
  description: 'data_projects.about_me.description.description',
  tags: {
    skills: [svelte, vite, animation, microFrontend, webComponent],
    hidden: [shell, remoteEntry, svelteI18n, svelteMui, sass, context, typescript, eslint, stylelint],
  },
  links: {
    github: 'https://github.com/dvcol/about-me',
  },
});

const AboutMeMeda = new Project({
  media: {
    url: 'assets/video/about-me-preview.hevc.mp4',
    type: MimeType.MP4,
    style: 'filter: brightness(0.8)',
    title: 'data_projects.about_me.media.title',
    subtitle: 'data_projects.about_me.media.subtitle',
    link: { label: 'data_projects.about_me.media.link.label', url: AboutDescription.links.github },
  },
});

export const AboutMeTile: StackTileProps = {
  left: AboutMeMeda,
  right: AboutDescription,
  primary: StackTilePrimary.Left,
};

const DvColDescription = new Project({
  title: 'data_projects.dv_col.description.title',
  subtitle: 'data_projects.dv_col.description.subtitle',
  description: 'data_projects.dv_col.description.description',
  tags: {
    skills: [solid, shell, multiFramework, vite, vitePwa, motion, animation],
    hidden: [workbox, preCaching, mobileWebApp, webComponent, remoteEntry, multipleRuntime, sass, context, typescript, eslint, stylelint],
  },
  links: {
    github: 'https://github.com/dvcol/dvcol.github.io',
  },
});

const DvColMeda = new Project({
  media: {
    url: 'assets/video/dv-col-preview.hevc.mp4',
    type: MimeType.MP4,
    style: 'filter: brightness(0.8)',
    title: 'data_projects.dv_col.media.title',
    subtitle: 'data_projects.dv_col.media.subtitle',
    link: { label: 'data_projects.dv_col.media.link.label', url: DvColDescription.links.store },
  },
});

export const DvColTile: StackTileProps = {
  left: DvColDescription,
  right: DvColMeda,
  primary: StackTilePrimary.Right,
};

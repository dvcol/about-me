import type { StackTileProps } from '~/models';

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
    url: 'assets/video/synology_demo.mp4',
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

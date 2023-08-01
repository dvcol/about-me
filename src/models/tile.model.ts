import type { ProjectLinks, ProjectMedia, ProjectTags } from '~/models/project.model';

export type TileProps = {
  class?: string;
  style?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  media?: ProjectMedia;
  links?: ProjectLinks;
  tags?: ProjectTags;
};

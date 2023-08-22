import type { Address } from '~/models/company.model';
import type { ProjectDuration, ProjectLinks, ProjectMedia, ProjectTags } from '~/models/project.model';

export type TileProps = {
  class?: string;
  style?: string;
  meta?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  duration?: ProjectDuration;
  address?: Address;
  media?: ProjectMedia;
  links?: ProjectLinks;
  tags?: ProjectTags;
};

export type TimelineTileProps = TileProps & {
  logo?: ProjectMedia;
};

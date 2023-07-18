import { v4 as uuid } from 'uuid';

import type { Skill } from '~/models/skill.model';

import type { Tag } from '~/models/tag.model';

export type ProjectLinks = {
  store?: string;
  github?: string;
  website?: string;
};

export type ProjectTags = {
  skills?: Skill[];
  other?: Tag[];
};

export type ProjectDuration = {
  start?: Date;
  end?: Date;
};

export type ProjectMedia = { url?: string; title?: string };

export class Project {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  media?: ProjectMedia;
  links?: ProjectLinks;
  tags?: ProjectTags;
  duration?: ProjectDuration;

  constructor(props?: Omit<Project, 'id'>) {
    this.id = uuid();
    this.title = props?.title;
    this.subtitle = props?.subtitle;
    this.description = props?.description;
    this.media = props?.media;
    this.links = props?.links;
    this.tags = props?.tags;
    this.duration = props?.duration;
  }
}

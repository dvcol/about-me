import { v4 as uuid } from 'uuid';

import type { Skill } from '~/models/skill.model';

import type { Tag } from '~/models/tag.model';

export type ProjectLinks = {
  store?: string;
  github?: string;
  website?: string;
};

export type ProjectTags = {
  hidden?: Skill[];
  skills?: Skill[];
  other?: Tag[];
};

export type ProjectDuration = {
  start?: Date;
  end?: Date;
};

export type ProjectMedia = { url?: string; title?: string; aspectRatio?: 'square' | '16x9' | undefined };

export class Project {
  readonly id: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly media?: ProjectMedia;
  readonly links?: ProjectLinks;
  readonly tags?: ProjectTags;
  readonly duration?: ProjectDuration;

  private tagIds = new Map<string, Tag>();

  constructor(props?: Omit<Project, 'id'>) {
    this.id = uuid();
    this.title = props?.title;
    this.subtitle = props?.subtitle;
    this.description = props?.description;
    this.media = props?.media;
    this.links = props?.links;
    this.tags = props?.tags;
    this.duration = props?.duration;

    this.parseTags();
  }

  private parseTags() {
    if (!this.tags) return;
    Object.values(this.tags).forEach(_tags => _tags?.forEach(t => this.tagIds.set(t.id, t)));
  }
}

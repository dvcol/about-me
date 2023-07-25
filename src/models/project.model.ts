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

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  GIF = 'image/gif',
  Bitmap = 'image/bmp',
  MicrosoftBitmap = 'image/x-ms-bmp',
  MP4 = 'video/mp4',
  OGG = 'video/ogg',
  WebM = 'video/webm',
  M4v = 'video/x-m4v',
  Quicktime = 'video/quicktime',
  MPEG = 'audio/mpeg',
  Waveform = 'audio/x-wav',
}

export type ProjectMedia = {
  url?: string;
  type?: MimeType;
  controls?: boolean;
  title?: string;
  subtitle?: string;
  link?: { label: string; url: string };
  aspectRatio?: 'square' | '16x9' | undefined;
};

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

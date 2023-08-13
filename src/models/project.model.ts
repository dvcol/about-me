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

export class ProjectDuration {
  options?: Intl.DateTimeFormatOptions;
  start?: Date;
  end?: Date;

  get range(): string {
    return [this.start?.toLocaleDateString(undefined, this.options), this.end?.toLocaleDateString(undefined, this.options)]
      .filter(Boolean)
      .join(' - ');
  }

  constructor(props?: Omit<ProjectDuration, 'range'>) {
    this.start = props.start;
    this.end = props.end;
    this.options = props.options ?? { year: 'numeric', month: 'short' };
  }
}

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
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
  background?: string;
};

export class Project {
  readonly id: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly logo?: ProjectMedia;
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
    this.logo = props?.logo;
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

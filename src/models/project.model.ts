import type { Skill } from '~/models/skill.model';

export type Project = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  links?: {
    store?: string;
    github?: string;
    website?: string;
  };
  media?: string;
  tags?: {
    skills?: Skill[];
    other?: string[];
  };
  duration?: {
    start?: Date;
    end?: Date;
  };
};

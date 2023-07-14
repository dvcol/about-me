import type { Project } from '~/models/project.model';

export type Job = Project & {
  missions: Mission[];
};

export type Mission = Project & {
  employer?: Job;
  client?: Project;
};

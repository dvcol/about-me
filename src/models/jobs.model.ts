import { Project } from '~/models/project.model';

export class Job extends Project {
  readonly missions?: Mission[];

  constructor(props: Omit<Job, 'id'>) {
    super(props);
    this.missions = props?.missions;
  }
}

export class Mission extends Project {
  readonly employer?: Job;
  readonly client?: Project;

  constructor(props: Omit<Mission, 'id'>) {
    super(props);
    this.employer = props?.employer;
    this.client = props?.client;
  }
}

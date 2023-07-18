import { Project } from '~/models/project.model';

export class Job extends Project {
  missions?: Mission[];

  constructor(props: Omit<Job, 'id'>) {
    super(props);
    this.missions = props?.missions;
  }
}

export class Mission extends Project {
  employer?: Job;
  client?: Project;

  constructor(props: Omit<Mission, 'id'>) {
    super(props);
    this.employer = props?.employer;
    this.client = props?.client;
  }
}

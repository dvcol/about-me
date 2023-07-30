import { v4 as uuid } from 'uuid';

import type { Address, Company } from '~/models/company.model';

import { Project } from '~/models/project.model';

export class Job {
  readonly id: string;
  readonly employer?: Company;
  readonly missions?: Mission[];

  constructor(props: Omit<Job, 'id'>) {
    this.id = uuid();
    this.employer = props?.employer;
    this.missions = props?.missions;
  }
}

export class Mission extends Project {
  readonly employer?: Company;
  readonly client?: Company;
  readonly address?: Address;

  constructor(props: Omit<Mission, 'id'>) {
    super(props);
    this.employer = props?.employer;
    this.client = props?.client;
    this.address = props?.address;
  }
}

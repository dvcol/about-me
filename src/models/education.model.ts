import { v4 as uuid } from 'uuid';

import type { Address, Company } from '~/models/company.model';

import { Project } from '~/models/project.model';

export class Education {
  readonly id: string;
  readonly institution?: Company;
  readonly diplomas?: Diploma[];

  constructor(props: Omit<Education, 'id'>) {
    this.id = uuid();
    this.institution = props?.institution;
    this.diplomas = props?.diplomas;
  }
}

export class Diploma extends Project {
  readonly institution?: Company;
  readonly address?: Address;

  constructor(props: Omit<Diploma, 'id'>) {
    super(props);
    this.institution = props?.institution;
    this.address = props?.address;
  }
}

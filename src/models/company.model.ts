import { v4 as uuid } from 'uuid';

import { Project } from '~/models/project.model';

export class Address {
  readonly id: string;
  readonly name?: string;
  readonly streetNumber?: string;
  readonly street?: string;
  readonly zipCode?: string;
  readonly city?: string;
  readonly region?: string;
  readonly country?: string;
  readonly google?: string;

  constructor(props?: Omit<Address, 'id'>) {
    this.id = uuid();
    this.name = props.name;
    this.streetNumber = props.streetNumber;
    this.street = props.street;
    this.zipCode = props.zipCode;
    this.city = props.city;
    this.region = props.region;
    this.city = props.city;
    this.country = props.country;
    this.google = props.google;
  }
}

export class Company extends Project {
  readonly address?: Address;

  constructor(props: Omit<Company, 'id'>) {
    super(props);
    this.address = props?.address;
  }
}

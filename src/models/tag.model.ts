import { v4 as uuid } from 'uuid';

export class Tag {
  readonly id: string;
  readonly name?: string;
  readonly label?: string;
  readonly link?: string;

  color?: string;

  constructor(props?: Omit<Tag, 'id'>) {
    this.id = uuid();
    this.name = props?.name;
    this.label = props?.label;
    this.color = props?.color;
    this.link = props?.link;
  }
}

import { v4 as uuid } from 'uuid';

export class Tag {
  id: string;
  name?: string;
  label?: string;
  color?: string;
  link?: string;

  constructor(props?: Omit<Tag, 'id'>) {
    this.id = uuid();
    this.name = props?.name;
    this.label = props?.label;
    this.color = props?.color;
    this.link = props?.link;
  }
}

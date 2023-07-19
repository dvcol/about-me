import { Tag } from '~/models/tag.model';

export class Skill extends Tag {
  readonly children?: Skill[];

  constructor(props?: Omit<Skill, 'id'>) {
    super(props);
    this.children = props?.children;
  }
}

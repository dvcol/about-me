import type { Project } from '~/models/project.model';

export enum StackTilePrimary {
  Left = 'left',
  Right = 'right',
}

export type StackTileProps = {
  left: Project;
  right: Project;
  primary?: StackTilePrimary;
};

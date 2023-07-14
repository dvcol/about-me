import type * as d3 from 'd3';

import type { Skill } from '~/models/skill.model';

export type SunburstData<T extends Skill = Skill> = T & {
  value?: number;
  depth?: number;
  children?: SunburstData<T>[];
  node?: SunburstNode<SunburstData<T>>;
};

export type DefaultObject = {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  current?: SunburstNode;
  target?: SunburstNode;
};

export type SunburstNode<T extends SunburstData = SunburstData> = d3.HierarchyRectangularNode<T> & DefaultObject;

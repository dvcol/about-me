import type { HierarchyNode, HierarchyRectangularNode } from 'd3';

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

export type SunburstHierarchyNode<T extends SunburstData = SunburstData> = HierarchyNode<T>;
export type SunburstHierarchyRectangularNode<T extends SunburstData = SunburstData> = SunburstHierarchyNode<T> & HierarchyRectangularNode<T>;

export type SunburstNode<T extends SunburstData = SunburstData> = SunburstHierarchyRectangularNode<T> & DefaultObject;

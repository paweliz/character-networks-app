export type GraphType = {
  nodes: {
    id: number; //| string;
    label: string;
    title: string;
    count?: number;
  }[];
  edges: {
    from: number | string;
    to: number | string;
    value?: number;
  }[];
};

export type GlobalGraphSettings = {
  minCountThreshold: number;
  maxCountThreshold: number;
};

export enum AppMode {
  normal,
  merge,
};

export type AppState = {
  mode: AppMode;
}

export enum NodeTypesColors {
  nam_liv = '#36b2d1',
  nam_loc = '#10c744', 
  nam_fac = '#ba933f',
}
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
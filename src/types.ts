export type GraphType = {
  nodes: {
    id: number;
    label: string;
    title: string;
    count?: number;
  }[];
  edges: {
    from: number;
    to: number;
  }[];
}

export type GlobalGraphSettings = {
  minCountThreshold: number;
  maxCountThreshold: number;
}
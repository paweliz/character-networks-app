import { createContext } from "react";

export type SelectedNodeContextType = {
  nodeId: string | null,
  updateNodeId: React.Dispatch<React.SetStateAction<string | null>>,
}

export const SelectedNodeContext = createContext<SelectedNodeContextType | null>(null);
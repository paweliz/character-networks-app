import { createContext } from "react";

export type SelectedNodeContextType = {
  nodeId: {value: string} | null,
  updateNodeId: React.Dispatch<React.SetStateAction<{value: string} | null>>,
}

export const SelectedNodeContext = createContext<SelectedNodeContextType | null>(null);
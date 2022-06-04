import { createContext } from "react";
import { AppState } from "../types";

export type AppStateContextType = {
  state: AppState,
  updateState: React.Dispatch<React.SetStateAction<AppState>>,
}

export const AppStateContext = createContext<AppStateContextType | null>(null);
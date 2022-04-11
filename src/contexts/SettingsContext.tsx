import { createContext } from "react";
import { GlobalGraphSettings } from "../types";

export type GlobalGraphSettingsContextType = {
  settings: GlobalGraphSettings,
  updateSettings: React.Dispatch<React.SetStateAction<GlobalGraphSettings>>,
}

export const GlobalGraphSettingsContext = createContext<GlobalGraphSettingsContextType | null>(null);
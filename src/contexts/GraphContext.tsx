import { createContext } from "react";
import { GraphType } from "../types";


export const GraphContext = createContext<GraphType | null>(null);
import { createContext } from "react";


export const GraphRefresherContext = createContext<() => void>(() => {});
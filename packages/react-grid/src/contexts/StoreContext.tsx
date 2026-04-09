import type { GridStore, PluginConfig } from "@jsoc/grid-core";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type StoreContextValue<C extends PluginConfig = PluginConfig> = {
  gridStore: GridStore<C>;
  setGridStore: Dispatch<SetStateAction<GridStore<C>>>;
};

export const StoreContext = createContext<
  StoreContextValue<PluginConfig> | undefined
>(undefined);

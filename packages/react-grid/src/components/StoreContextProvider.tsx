import {
  StoreContext,
  type StoreContextValue,
} from "#contexts/StoreContext.tsx";

import type { PluginConfig } from "@jsoc/grid-core";
import type { ReactNode } from "react";

export type StoreContextProviderProps<C extends PluginConfig = PluginConfig> = {
  value: StoreContextValue<C>;
  children: ReactNode;
};

export function StoreContextProvider<C extends PluginConfig>({
  value,
  children,
}: StoreContextProviderProps<C>) {
  return (
    <StoreContext.Provider
      value={value as unknown as StoreContextValue<PluginConfig>}
    >
      {children}
    </StoreContext.Provider>
  );
}

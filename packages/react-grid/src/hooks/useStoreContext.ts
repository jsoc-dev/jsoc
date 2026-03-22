import type { ConfigByPlugin, GridPlugin } from "#config-generators/index.ts";
import {
  StoreContext,
  StoreContextAg,
  StoreContextMui,
  type StoreContextValue,
} from "#contexts/StoreContext.tsx";
import { ReactGridError } from "#errors/ReactGridError.ts";

import { type Context, useContext } from "react";

export type UseStoreContext<P extends GridPlugin> = () => StoreContextValue<
  ConfigByPlugin[P]
>;

export const useStoreContext = createUseStoreContext(StoreContext);
export const useStoreContextAg = createUseStoreContext(StoreContextAg, "ag");
export const useStoreContextMui = createUseStoreContext(StoreContextMui, "mui");

function createUseStoreContext<P extends GridPlugin>(
  StoreContext: Context<StoreContextValue<ConfigByPlugin[P]> | undefined>,
  plugin?: P,
): UseStoreContext<P> {
  return function useStoreContext() {
    const ctx = useContext(StoreContext);

    if (!ctx) {
      throw new ReactGridError(
        `Missing provider for useStoreContext${plugin ? `(${plugin})` : ""}.`,
      );
    }

    return ctx;
  };
}

import {
  StoreContext,
  type StoreContextValue,
} from "#contexts/StoreContext.tsx";
import { ReactGridError } from "#errors/ReactGridError.ts";

import type { PluginConfig } from "@jsoc/grid-core";
import { useContext } from "react";

export function useStoreContext<
  C extends PluginConfig = PluginConfig,
>(): StoreContextValue<C> {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new ReactGridError(`Missing provider for useStoreContext`);
  }

  return ctx as unknown as StoreContextValue<C>;
}

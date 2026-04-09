import type { StoreContextValue } from "#contexts/StoreContext.tsx";

import {
  type GridOptions,
  type GridStore,
  newGridStore,
  type PluginConfig,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";
import { shallowEqual } from "@jsoc/utils";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";

export function useCoreStore<C extends PluginConfig>(
  gridOptions: GridOptions,
  configGenerator: PluginConfigGenerator<C>,
  configGeneratorOptions?: PluginConfigGeneratorOptions<C>,
): StoreContextValue<C> {
  const lastGridOptionsRef = useRef<GridOptions | null>(null);
  const lastGeneratorOptionsRef = useRef<
    PluginConfigGeneratorOptions<C> | null | undefined
  >(null);

  const [gridStore, setGridStore] = useState(() =>
    createStore<C>(
      lastGridOptionsRef,
      lastGeneratorOptionsRef,
      gridOptions,
      configGenerator,
      configGeneratorOptions,
    ),
  );

  // update grid store when options fields shallowly change.
  useEffect(() => {
    const shouldUpdate =
      !lastGridOptionsRef.current ||
      !lastGeneratorOptionsRef.current ||
      !shallowEqual(gridOptions, lastGridOptionsRef.current) ||
      !shallowEqual(configGeneratorOptions, lastGeneratorOptionsRef.current);

    if (shouldUpdate) {
      const store = createStore<C>(
        lastGridOptionsRef,
        lastGeneratorOptionsRef,
        gridOptions,
        configGenerator,
        configGeneratorOptions,
      );

      setGridStore(store);
    }
  }, [gridOptions, configGenerator, configGeneratorOptions]);

  // prepare the store context value
  const storeContextValue = useMemo(
    () => ({
      gridStore,
      setGridStore,
    }),
    [gridStore, setGridStore],
  );

  return storeContextValue;
}

function createStore<C extends PluginConfig>(
  lastGridOptionsRef: RefObject<GridOptions | null>,
  lastGeneratorOptionsRef: RefObject<
    PluginConfigGeneratorOptions<C> | null | undefined
  >,
  gridOptions: GridOptions,
  configGenerator: PluginConfigGenerator<C>,
  configGeneratorOptions?: PluginConfigGeneratorOptions<C>,
): GridStore<C> {
  const pluginOptions = {
    configGenerator,
    configGeneratorOptions,
  };

  const gridStore = newGridStore(gridOptions, pluginOptions);

  lastGridOptionsRef.current = gridOptions;
  lastGeneratorOptionsRef.current = configGeneratorOptions;

  return gridStore;
}

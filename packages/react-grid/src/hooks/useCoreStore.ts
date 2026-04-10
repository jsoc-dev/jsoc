import type { StoreContextValue } from "#contexts/StoreContext.tsx";

import {
  type GridOptions,
  newGridStore,
  type PluginConfig,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";
import { shallowEqual } from "@jsoc/utils";
import { useEffect, useMemo, useRef, useState } from "react";

export function useCoreStore<C extends PluginConfig>(
  gridOptions: GridOptions,
  configGenerator: PluginConfigGenerator<C>,
  configGeneratorOptions?: PluginConfigGeneratorOptions<C>,
): StoreContextValue<C> {
  const gridOptionsRef = useRef(gridOptions);
  const generatorOptionsRef = useRef(configGeneratorOptions);

  const [gridStore, setGridStore] = useState(() =>
    newGridStore(gridOptions, {
      configGenerator,
      configGeneratorOptions,
    }),
  );

  useEffect(() => {
    const shouldUpdate =
      !shallowEqual(gridOptions, gridOptionsRef.current) ||
      !shallowEqual(configGeneratorOptions, generatorOptionsRef.current);

    if (shouldUpdate) {
      gridOptionsRef.current = gridOptions;
      generatorOptionsRef.current = configGeneratorOptions;
      setGridStore(
        newGridStore(gridOptions, {
          configGenerator,
          configGeneratorOptions,
        }),
      );
    }
  }, [gridOptions, configGenerator, configGeneratorOptions]);

  return useMemo(
    () => ({
      gridStore,
      setGridStore,
    }),
    [gridStore, setGridStore],
  );
}

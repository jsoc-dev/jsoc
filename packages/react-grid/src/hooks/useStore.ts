import {
  CONFIG_GENERATOR_BY_PLUGIN,
  type ConfigByPlugin,
  type GridPlugin,
} from "#config-generators/configGenerator.registry.ts";

import {
  type GridOptions,
  newGridStore,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";
import { useEffect, useMemo, useState } from "react";

/**
 * Generic hook to create and use a grid store.
 */
export function useStore<P extends GridPlugin>(
  gridOptions: GridOptions,
  plugin: P,
  pluginConfigGeneratorOptions?: PluginConfigGeneratorOptions<
    ConfigByPlugin[P]
  >,
) {
  const pluginOptions = useMemo(
    () => ({
      configGenerator: CONFIG_GENERATOR_BY_PLUGIN[plugin],
      configGeneratorOptions: pluginConfigGeneratorOptions,
    }),
    [plugin, pluginConfigGeneratorOptions],
  );

  const [gridStore, setGridStore] = useState(() =>
    newGridStore<ConfigByPlugin[P]>(gridOptions, pluginOptions),
  );

  useEffect(() => {
    setGridStore(newGridStore<ConfigByPlugin[P]>(gridOptions, pluginOptions));
  }, [gridOptions, pluginOptions]);

  return {
    gridStore,
    setGridStore,
  };
}

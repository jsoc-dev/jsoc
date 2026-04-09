import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/prime/COLUMN_GENERATORS.tsx";
import type { PluginConfigPrime } from "#plugins/prime/types.ts";

import {
  generateColumns,
  type GridOptions,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorPrime = PluginConfigGenerator<PluginConfigPrime>;

const configGenerator: ConfigGeneratorPrime = (gridSchema, options) => {
  const { rows } = gridSchema.meta;
  const columns = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  );

  return {
    columns,
    value: rows,
  };
};

export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigPrime>,
) {
  return useCoreStore<PluginConfigPrime>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

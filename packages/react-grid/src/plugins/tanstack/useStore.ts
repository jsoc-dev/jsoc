import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/tanstack/COLUMN_GENERATORS.tsx";
import type { PluginConfigTanstack } from "#plugins/tanstack/types.ts";

import {
  generateColumns,
  type GridOptions,
  type GridRowId,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorTanstack = PluginConfigGenerator<PluginConfigTanstack>;

const configGenerator: ConfigGeneratorTanstack = (gridSchema, options) => {
  const { rows, primaryColumnKey } = gridSchema.meta;
  const columns = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  );

  return {
    columns,
    data: rows,
    getRowId: (row) => String(row[primaryColumnKey] as GridRowId),
  };
};

export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigTanstack>,
) {
  return useCoreStore<PluginConfigTanstack>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

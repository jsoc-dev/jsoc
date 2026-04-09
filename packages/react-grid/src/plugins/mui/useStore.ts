import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/mui/COLUMN_GENERATORS.tsx";
import type { PluginConfigMui } from "#plugins/mui/types.ts";

import {
  generateColumns,
  type GridOptions,
  type GridRowId,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorMui = PluginConfigGenerator<PluginConfigMui>;

const configGenerator: ConfigGeneratorMui = (gridSchema, options) => {
  const { rows, primaryColumnKey } = gridSchema.meta;
  const columns = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  );

  return {
    columns,
    getRowId: (row) => String(row[primaryColumnKey] as GridRowId),
    rows,
  };
};

export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigMui>,
) {
  return useCoreStore<PluginConfigMui>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

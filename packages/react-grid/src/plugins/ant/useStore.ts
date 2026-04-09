import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/ant/COLUMN_GENERATORS.tsx";
import type { PluginConfigAnt } from "#plugins/ant/types.ts";

import {
  generateColumns,
  type GridOptions,
  type GridRowId,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorAnt = PluginConfigGenerator<PluginConfigAnt>;

const configGenerator: ConfigGeneratorAnt = (gridSchema, options) => {
  const { rows, primaryColumnKey } = gridSchema.meta;
  const columns = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  );

  return {
    columns,
    dataSource: rows,
    rowKey: (row) => String(row[primaryColumnKey] as GridRowId),
  };
};

export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigAnt>,
) {
  return useCoreStore<PluginConfigAnt>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/mantine/COLUMN_GENERATORS.tsx";
import type {
  ColDefMantine,
  PluginConfigMantine,
} from "#plugins/mantine/types.ts";

import {
  generateColumns,
  type GridOptions,
  type GridRowId,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorMantine = PluginConfigGenerator<PluginConfigMantine>;

export const configGenerator: ConfigGeneratorMantine = (
  gridSchema,
  options,
) => {
  const { rows, primaryColumnKey } = gridSchema.meta;
  const columns = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  ) as ColDefMantine[];

  return {
    columns,
    data: rows,
    getRowId: (row) => String(row[primaryColumnKey] as GridRowId),
  };
};

export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigMantine>,
) {
  return useCoreStore<PluginConfigMantine>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

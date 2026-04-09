import { useCoreStore } from "#hooks/useCoreStore.ts";
import { COLUMN_GENERATORS } from "#plugins/ag/COLUMN_GENERATORS.tsx";
import type { PluginConfigAg } from "#plugins/ag/types.ts";

import {
  generateColumns,
  type GridOptions,
  type GridRowId,
  type PluginConfigGenerator,
  type PluginConfigGeneratorOptions,
} from "@jsoc/grid-core";

type ConfigGeneratorAg = PluginConfigGenerator<PluginConfigAg>;

const configGenerator: ConfigGeneratorAg = (gridSchema, options) => {
  const { rows, primaryColumnKey } = gridSchema.meta;
  const columnDefs = generateColumns(
    gridSchema,
    COLUMN_GENERATORS,
    options?.customColumnGeneratorByType,
  );

  return {
    columnDefs,
    getRowId: ({ data }) => String(data[primaryColumnKey] as GridRowId),
    rowData: rows,
  };
};

/**
 * Hook to create and use a grid store.
 * - Provide the result of this hook to the `StoreContextProvider` component in your app.
 * - To avoid unnecessary re-renders, provide the hook result without destructuring and recreating.
 */
export function useStore(
  gridOptions: GridOptions,
  configGeneratorOptions?: PluginConfigGeneratorOptions<PluginConfigAg>,
) {
  return useCoreStore<PluginConfigAg>(
    gridOptions,
    configGenerator,
    configGeneratorOptions,
  );
}

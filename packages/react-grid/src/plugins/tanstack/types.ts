import type { GridRow, PluginConfig } from "@jsoc/grid-core";
import type { ColumnDef, TableOptions } from "@tanstack/react-table";

export type ColDefTanstack = ColumnDef<GridRow>;

export type PluginConfigTanstack = PluginConfig<ColDefTanstack> &
  Pick<TableOptions<GridRow>, "columns" | "data" | "getRowId">;

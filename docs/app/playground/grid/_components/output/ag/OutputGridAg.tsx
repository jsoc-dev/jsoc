import { useOutputPaneBodyContext } from "@/app/playground/grid/_components/output/";
import { OutputGridAgWrapper } from "@/app/playground/grid/_components/output/ag/OutputGridAgWrapper";
import { ToggleSubGridButton } from "@/app/playground/grid/_components/output/shared";

import { COLUMN_FACTORY_AG, JsocGrid } from "@jsoc/react/grid";
import {
  themeQuartz,
  colorSchemeDark,
  type ICellRendererParams,
} from "ag-grid-community";
import { useTheme } from "next-themes";

export function OutputGridAg() {
  const { gridData, selectedJsonOption } = useOutputPaneBodyContext();
  const { resolvedTheme } = useTheme();

  const customColDefProviderForArrayOfObjects: typeof COLUMN_FACTORY_AG.arrayOfObjects =
    (params) => {
      return COLUMN_FACTORY_AG.arrayOfObjects(params, {
        cellRenderer: (cellParams: ICellRendererParams) => {
          const { columnKey, gridId, gridIdColumnKey } = params;
          const { data, value } = cellParams;

          return (
            <ToggleSubGridButton
              subGridData={value}
              parentGridId={gridId}
              parentGridCellLocation={{
                rowId: data[gridIdColumnKey],
                columnKey,
              }}
            />
          );
        },
      });
    };

  return (
    <JsocGrid
      data={gridData}
      ui="ag"
      uiProps={{
        custom: {
          gridId: selectedJsonOption,
          columnFactory: {
            arrayOfObjects: customColDefProviderForArrayOfObjects,
            object: customColDefProviderForArrayOfObjects,
          },
        },
        native: {
          theme:
            resolvedTheme === "dark"
              ? themeQuartz.withPart(colorSchemeDark)
              : themeQuartz,
        },
      }}
      CustomWrapper={OutputGridAgWrapper}
    />
  );
}

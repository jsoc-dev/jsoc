import { JsocGrid } from "@jsoc/react/grid";
import { OutputGridAgWrapper } from "./OutputGridAgWrapper";
import { useOutputPaneBodyContext } from "../OutputPaneBody";
import { useTheme } from "next-themes";
import { themeQuartz, colorSchemeDark } from "ag-grid-community";

export function OutputGridAg() {
  const { gridData, selectedJsonOption } = useOutputPaneBodyContext();
  const { resolvedTheme } = useTheme();

  return (
    <JsocGrid
      data={gridData}
      ui="ag"
      uiProps={{
        custom: {
          gridId: selectedJsonOption,
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

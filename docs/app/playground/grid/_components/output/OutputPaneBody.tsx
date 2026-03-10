
import { ErrorMessage } from "@/app/_components";
import { OutputGridMui } from "@/app/playground/grid/_components/output/mui";
import { OutputGridAg } from "@/app/playground/grid/_components/output/ag";
import type {
  DemoJson,
  DemoJsonOption,
  DemoUiOption,
} from "@/app/playground/grid/GridPlayground";
import { isValidGridData, type GridData } from "@jsoc/core/grid";
import { decode } from "@jsoc/core/utils";
import { createContext, useContext } from "react";

type Props = {
  json: DemoJson;
  selectedJsonOption: DemoJsonOption;
  selectedUiOption: DemoUiOption;
};

export function OutputPaneBody({
  json,
  selectedJsonOption,
  selectedUiOption,
}: Props) {
  const { value: gridData, error } = decode(json);

  if (error || !isValidGridData(gridData)) {
    const message = error ? error.message : "Invalid Grid Data";
    return <ErrorMessage type={"Error"} message={message} />;
  }

  const contextValue = {
    gridData,
    selectedJsonOption,
  };

  return (
    <OutputPaneBodyContext.Provider value={contextValue}>
      <div className={`h-full w-full`}>
        {selectedUiOption === "ag" ? (
          <OutputGridAg />
        ) : selectedUiOption === "mui" ? (
          <OutputGridMui />
        ) : null}
      </div>
    </OutputPaneBodyContext.Provider>
  );
}

export type OutputPaneBodyContextType = {
  gridData: GridData;
  selectedJsonOption: DemoJsonOption;
};

export const OutputPaneBodyContext =
  createContext<OutputPaneBodyContextType | null>(null);

export function useOutputPaneBodyContext() {
  const context = useContext(OutputPaneBodyContext);

  if (!context) {
    throw new Error(
      "useOutputPaneBodyContext must be used within OutputPaneBody",
    );
  }

  return context;
}

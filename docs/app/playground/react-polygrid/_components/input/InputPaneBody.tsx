import {
  createPlaygroundGridOptions,
  type GridOptionsState,
} from "@/playground/react-polygrid/Playground";

import { Editor, type OnChange } from "@monaco-editor/react";
import { useTheme } from "next-themes";

export function InputPaneBody({
  gridOptions,
  setGridOptions,
}: GridOptionsState) {
  const { resolvedTheme } = useTheme();

  const onEditorChange: OnChange = (value: string = "") => {
    setGridOptions(createPlaygroundGridOptions(gridOptions.name, value));
  };

  return (
    <div className="bg-background border border-border h-full rounded-sm overflow-hidden">
      <Editor
        key={gridOptions.name}
        defaultValue={gridOptions.data}
        language="json"
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        onChange={onEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

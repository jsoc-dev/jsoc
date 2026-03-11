import { Editor, type OnChange } from "@monaco-editor/react";
import type {
  DemoJson,
  DemoJsonOption,
} from "@/app/playground/grid/GridPlayground";
import { useTheme } from "next-themes";

type Props = {
  selectedJsonOption: DemoJsonOption;

  json: DemoJson;
  setJson: React.Dispatch<React.SetStateAction<DemoJson>>;
};

export function InputPaneBody({ selectedJsonOption, json, setJson }: Props) {
  const { resolvedTheme } = useTheme();

  const onEditorChange: OnChange = (value: string = "") => {
    setJson(value);
  };

  return (
    <div className="bg-background border border-border h-full rounded-sm overflow-hidden">
      <Editor
        key={selectedJsonOption}
        defaultValue={json}
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

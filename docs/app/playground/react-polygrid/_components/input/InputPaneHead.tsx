import { HeadLayout } from "@/app/playground/react-polygrid/_components/shared";
import {
  SAMPLE_JSON_NAMES,
  SAMPLE_JSON_STRINGS,
  type SampleJsonName,
} from "@/app/playground/react-polygrid/_components/input/json";
import {
  createPlaygroundGridOptions,
  type GridOptionsState,
} from "@/app/playground/react-polygrid/Playground";

export function InputPaneHead({
  gridOptions,
  setGridOptions,
}: GridOptionsState) {
  return (
    <HeadLayout heading="JSON">
      <div className="flex gap-3">
        {SAMPLE_JSON_NAMES.map((jsonName) => (
          <button
            className={`${getSelectedCls(jsonName)} `}
            key={jsonName}
            onClick={() => onJsonNameClick(jsonName)}
          >
            <span className="inline-block w-max">{jsonName}</span>
          </button>
        ))}
      </div>
    </HeadLayout>
  );

  function onJsonNameClick(jsonName: SampleJsonName) {
    setGridOptions(
      createPlaygroundGridOptions(jsonName, SAMPLE_JSON_STRINGS[jsonName]),
    );
  }

  function getSelectedCls(jsonName: SampleJsonName): string {
    return jsonName === gridOptions.name
      ? "text-primary font-medium"
      : "text-muted-foreground hover:text-foreground transition-colors";
  }
}

import { HeadLayout } from "@/app/playground/grid/_components/shared";
import { EXAMPLE_JSON_LIST } from "@/app/playground/grid/_json";
import { type DemoJsonOption } from "@/app/playground/grid/GridPlayground";

type Props = {
  selectedJsonOption: DemoJsonOption;
  setSelectedJsonOption: React.Dispatch<React.SetStateAction<DemoJsonOption>>;
};
export function InputPaneHead({
  selectedJsonOption,
  setSelectedJsonOption,
}: Props) {
  return (
    <HeadLayout heading="JSON">
      <div className="flex gap-3">
        {EXAMPLE_JSON_LIST.map((jsonOption) => (
          <button
            className={`${getSelectedCls(jsonOption)} `}
            key={jsonOption}
            onClick={() => onJsonOptionClick(jsonOption)}
          >
            <span className="inline-block w-max">{jsonOption}</span>
          </button>
        ))}
      </div>
    </HeadLayout>
  );

  function onJsonOptionClick(selectedJsonOption: DemoJsonOption) {
    setSelectedJsonOption(selectedJsonOption);
  }

  function getSelectedCls(jsonOption: DemoJsonOption): string {
    return jsonOption === selectedJsonOption
      ? "text-primary font-medium"
      : "text-muted-foreground hover:text-foreground transition-colors";
  }
}

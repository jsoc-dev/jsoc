import { type DemoUiOption } from "@/app/playground/grid/GridPlayground";
import { HeadLayout } from "@/app/playground/grid/_components/shared";

const uiOptions: [DemoUiOption, string][] = [
  ["mui", "MUI X"],
  ["ag", "AG-Grid"],
];

type Props = {
  selectedUiOption: DemoUiOption;
  setSelectedUiOption: (selectedUiOption: DemoUiOption) => void;
};

export function OutputPaneHead({
  selectedUiOption,
  setSelectedUiOption,
}: Props) {
  return (
    <HeadLayout heading="UI">
      <div className="flex gap-3">
        {uiOptions.map(([uiKey, uiName]) => (
          <button
            className={`${getSelectedCls(uiKey)} `}
            key={uiKey}
            onClick={() => onUiOptionClick(uiKey)}
          >
            {/* TODO: Show library icon also */}
            <span className="inline-block w-max">{uiName}</span>
          </button>
        ))}
      </div>
    </HeadLayout>
  );

  function onUiOptionClick(selectedUiOption: DemoUiOption) {
    setSelectedUiOption(selectedUiOption);
  }

  function getSelectedCls(uiOption: DemoUiOption): string {
    return selectedUiOption === uiOption
      ? "text-primary font-medium"
      : "text-muted-foreground hover:text-foreground transition-colors";
  }
}

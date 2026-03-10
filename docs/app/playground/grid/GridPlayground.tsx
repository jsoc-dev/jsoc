"use client";

import { SplitView } from "@/app/_components";
import { EXAMPLE_JSON } from "@/app/playground/grid/_json";
import {
  InputPaneHead,
  InputPaneBody,
} from "@/app/playground/grid/_components/input";
import {
  OutputPaneHead,
  OutputPaneBody,
} from "@/app/playground/grid/_components/output";
import { useEffect, useState } from "react";
import { EXAMPLE_JSON_LIST } from "@/app/playground/grid/_json";
import { type GridUiAdapterName } from "@jsoc/react/grid";

export type DemoJsonOption = (typeof EXAMPLE_JSON_LIST)[number];
export type DemoUiOption = GridUiAdapterName;
export type DemoJson = string;

export function GridPlayground() {
  const [selectedJsonOption, setSelectedJsonOption] =
    useState<DemoJsonOption>("shoe");
  const [selectedUiOption, setSelectedUiOption] = useState<DemoUiOption>("mui");

  const [json, setJson] = useState<DemoJson>(EXAMPLE_JSON[selectedJsonOption]);

  useEffect(() => {
    setJson(EXAMPLE_JSON[selectedJsonOption]);
  }, [selectedJsonOption]);

  return (
    <SplitView className="flex-1 svrow:max-h-[700px] mt-6 min-h-96">
      <SplitView.Pane>
        <SplitView.Pane.Head>
          <InputPaneHead
            selectedJsonOption={selectedJsonOption}
            setSelectedJsonOption={setSelectedJsonOption}
          />
        </SplitView.Pane.Head>

        <SplitView.Pane.Body>
          <InputPaneBody
            selectedJsonOption={selectedJsonOption}
            json={json}
            setJson={setJson}
          />
        </SplitView.Pane.Body>
      </SplitView.Pane>

      <SplitView.Pane>
        <SplitView.Pane.Head>
          <OutputPaneHead
            selectedUiOption={selectedUiOption}
            setSelectedUiOption={setSelectedUiOption}
          />
        </SplitView.Pane.Head>

        <SplitView.Pane.Body>
          <OutputPaneBody
            json={json}
            selectedJsonOption={selectedJsonOption}
            selectedUiOption={selectedUiOption}
          />
        </SplitView.Pane.Body>
      </SplitView.Pane>
    </SplitView>
  );
}

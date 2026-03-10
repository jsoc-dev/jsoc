import { Editor, type OnChange } from '@monaco-editor/react';
import type { DemoJson, DemoJsonOption } from '@/app/playground/grid/GridPlayground';

type Props = {
	selectedJsonOption: DemoJsonOption;

	json: DemoJson;
	setJson: React.Dispatch<React.SetStateAction<DemoJson>>;
};

export function InputPaneBody({ selectedJsonOption, json, setJson }: Props) {
	const onEditorChange: OnChange = (value: string = "") => {
		setJson(value);
	};

	return (
		<div className='bg-white border border-[#e5e7eb] h-full rounded-sm'>
			<Editor
				key={selectedJsonOption}
				defaultValue={json}
				language='json'
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

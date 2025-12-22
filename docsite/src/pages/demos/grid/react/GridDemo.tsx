import { singleProductJson } from './json/products';
import { Section } from '../../../../components/Section';
import { useState, createContext } from 'react';
import { type GridUiAdapterName } from '@jsoc/react/grid';
import { SplitView } from '../../../../components/SplitView';
import { JsonSelector, InputJsonRenderer } from './components/InputPane';
import { UiSelector, OutputGridRenderer } from './components/OutputPane';
import { type CodeError } from '../../../../components/code-editor/CodeEditor';
import { validateCode } from '../../../../components/code-editor/utils/codeLanguageUtil';

export type DemoGridName = string;
export type DemoGridJson = string;
export type DemoGridError = CodeError;
export type DemoGridUi = GridUiAdapterName;

const DEFAULT_NAME: DemoGridName = 'products';
const DEFAULT_JSON: DemoGridJson = singleProductJson;
const DEFAULT_ERROR: DemoGridError = validateCode(DEFAULT_JSON, 'json');
const DEFAULT_UI: DemoGridUi = 'mui';
const SET_STATE_FAKE = () => undefined;

/**
 * GridDemo Component
 */
export function GridDemo() {
	const [name, setName] = useState(DEFAULT_NAME);
	const [json, setJson] = useState(DEFAULT_JSON);
	const [error, setError] = useState(DEFAULT_ERROR);
	const [ui, setUi] = useState(DEFAULT_UI);

	return (
		<JsocGridDemoContext.Provider
			value={{
				name,
				setName,
				json,
				setJson,
				error,
				setError,
				ui,
				setUi,
			}}
		>
			<div className='flex flex-col min-h-full'>
				<Section
					isHeading
					title='Grid Demo'
					subtitle='Check out how your JSON data would look when rendered in different Grid UI libraries'
				/>
				<SplitView className='flex-1'>
					<SplitView.Pane header={<JsonSelector />}>
						<InputJsonRenderer />
					</SplitView.Pane>

					<SplitView.Pane header={<UiSelector />}>
						<OutputGridRenderer />
					</SplitView.Pane>
				</SplitView>
			</div>
		</JsocGridDemoContext.Provider>
	);
}

export type JsocGridDemoContext = {
	name: DemoGridName;
	setName: React.Dispatch<React.SetStateAction<DemoGridName>>;
	json: DemoGridJson;
	setJson: React.Dispatch<React.SetStateAction<DemoGridJson>>;
	error: DemoGridError;
	setError: React.Dispatch<React.SetStateAction<DemoGridError>>;
	ui: DemoGridUi;
	setUi: React.Dispatch<React.SetStateAction<DemoGridUi>>;
};
export const JsocGridDemoContext = createContext<JsocGridDemoContext>({
	name: DEFAULT_NAME,
	setName: SET_STATE_FAKE,
	json: DEFAULT_JSON,
	setJson: SET_STATE_FAKE,
	error: DEFAULT_ERROR,
	setError: SET_STATE_FAKE,
	ui: DEFAULT_UI,
	setUi: SET_STATE_FAKE,
});

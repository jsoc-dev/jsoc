import { DEMO_GRID_JSON_MAP } from './utils/jsonMap';
import { Section } from '../../../../components/Section';
import { useState, createContext } from 'react';
import { type GridUiAdapterName } from '@jsoc/react/grid';
import { SplitView } from '../../../../components/SplitView';
import { JsonOptions } from './components/inputPane/JsonOptions';
import { UiOptions } from './components/outputPane/UiOptions';
import { CodeEditor, type CodeError } from 'code-editor';
import { validateCode } from 'code-editor/utils';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { OutputGrid } from './components/outputPane/OutputGrid';

export type DemoGridJson = string;
export type DemoGridJsonOption = string;
export type DemoGridJsonError = CodeError;
export type DemoGridUiOption = GridUiAdapterName;

const DEFAULT_JSON_OPTION: DemoGridJsonOption = 'shoe';
const DEFAULT_JSON: DemoGridJson = DEMO_GRID_JSON_MAP[DEFAULT_JSON_OPTION];
const DEFAULT_JSON_ERROR: CodeError = validateCode(DEFAULT_JSON, 'json');
const DEFAULT_UI_OPTION: DemoGridUiOption = 'mui';

export type JsocGridDemoContext = {
	json: DemoGridJson;
	jsonOption: DemoGridJsonOption;
	jsonError: DemoGridJsonError;
	uiOption: DemoGridUiOption;
	setJson: React.Dispatch<React.SetStateAction<DemoGridJson>>;
	setJsonOption: React.Dispatch<React.SetStateAction<DemoGridJsonOption>>;
	setJsonError: React.Dispatch<React.SetStateAction<DemoGridJsonError>>;
	setUiOption: React.Dispatch<React.SetStateAction<DemoGridUiOption>>;
};
/**
 * JsocGridDemoContext
 */
export const JsocGridDemoContext = createContext<JsocGridDemoContext>({
	json: '',
	jsonOption: DEFAULT_JSON_OPTION,
	jsonError: DEFAULT_JSON_ERROR,
	uiOption: DEFAULT_UI_OPTION,
	setJson: () => undefined,
	setJsonOption: () => undefined,
	setJsonError: () => undefined,
	setUiOption: () => undefined,
});

/**
 * GridDemo Component
 */
export function GridDemo() {
	const [json, setJson] = useState(DEFAULT_JSON);
	const [jsonOption, setJsonOption] = useState(DEFAULT_JSON_OPTION);
	const [jsonError, setJsonError] = useState(DEFAULT_JSON_ERROR);
	const [uiOption, setUiOption] = useState(DEFAULT_UI_OPTION);

	return (
		<JsocGridDemoContext.Provider
			value={{
				json,
				jsonOption,
				jsonError,
				uiOption,
				setJson,
				setJsonOption,
				setJsonError,
				setUiOption,
			}}
		>
			<div className='flex flex-col min-h-full py-pageY'>
				<Section
					isHeading
					title='Grid Demo'
					subtitle='Check out how your JSON data would look when rendered in different Grid UI libraries'
				/>
				<SplitView className='flex-1 svrow:max-h-[700px]'>
					<SplitView.Pane header={<JsonOptions />}>
						<div className='flex h-full'>
							<CodeEditor
								className='flex-1'
								code={json}
								codeError={jsonError}
								codeLang='json'
								highlightLineCls='bg-red-100'
								highlightLines={
									jsonError?.line ? [jsonError?.line] : []
								}
								fileName={jsonOption}
								setCode={setJson}
								setCodeError={setJsonError}
							/>
						</div>
					</SplitView.Pane>

					<SplitView.Pane header={<UiOptions />}>
						{jsonError ? (
							<ErrorMessage
								type={jsonError?.type || 'Error'}
								message={jsonError.message}
								fileName={jsonOption + '.json'}
							/>
						) : (
							<OutputGrid />
						)}
					</SplitView.Pane>
				</SplitView>
			</div>
		</JsocGridDemoContext.Provider>
	);
}

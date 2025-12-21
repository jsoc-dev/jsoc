import { singleProductJson } from './json/products';
import { Section } from '../../../../components/Section';
import { useState, createContext } from 'react';
import { type GridUiAdapterName } from '@jsoc/react/grid';
import { SplitView } from '../../../../components/SplitView';
import { JsonSelector, InputJsonRenderer } from './InputPane';
import { UiSelector, OutputGridRenderer } from './OutputPane';

export function GridDemo() {
	const [name, setName] = useState('Products');
	const [json, setJson] = useState(singleProductJson);
	const [error, setError] = useState('');
	const [ui, setUi] = useState<GridUiAdapterName>('mui');

	// TODO: Make it responsive for mobile devices
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
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	json: string;
	setJson: React.Dispatch<React.SetStateAction<string>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
	ui: GridUiAdapterName;
	setUi: React.Dispatch<React.SetStateAction<GridUiAdapterName>>;
};
export const JsocGridDemoContext = createContext<JsocGridDemoContext>({
	name: '',
	setName: () => undefined,
	json: '',
	setJson: () => undefined,
	error: '',
	setError: () => undefined,
	ui: 'mui',
	setUi: () => undefined,
});

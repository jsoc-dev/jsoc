import { singleProductJson } from './json/products';
import { Section } from '../../../../components/Section';
import { PaneWrapper } from '../../../../components/Pane';
import { OutputPane } from './OutputPane';
import { InputPane } from './InputPane';
import { useState, createContext } from 'react';
import { type GridUiAdapterName } from '@jsoc/react/grid';

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
			<Section
				isHeading
				title='Grid Demo'
				subtitle='Check out how your JSON data would look when rendered in different Grid UI libraries'
			/>
			<div className='mb-10 flex min-h-96 w-full flex-col items-stretch  border shadow-lg border-outline-subtle rounded-xl overflow-hidden md:flex-row'>
				{/* input pane */}
				<PaneWrapper className='w-full md:w-[30%] md:min-w-[30%]'>
					<InputPane />
				</PaneWrapper>

				{/* divider */}
				<span className='border-r border-r-outline-subtle self-stretch'></span>

				{/* output pane */}
				<PaneWrapper className='flex-1 min-w-0 min-h-0 overflow-hidden'>
					<OutputPane />
				</PaneWrapper>
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

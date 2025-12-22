import { PaneHeader } from './PaneHeader';
import { JsocGridDemoContext } from '../GridDemo';
import { decode } from '@jsoc/core/utils';
import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';
import { useCallback, useContext } from 'react';

const uiOptions: [GridUiAdapterName, string][] = [
	['mui', 'MUI X'],
	['ag', 'AG-Grid'],
];

export function UiSelector() {
	const { ui, setUi } = useContext(JsocGridDemoContext);
	const handleSelectUi = useCallback((uiKey: GridUiAdapterName) => {
		setUi(uiKey);
	}, []);

	const getSelectedCls = function (uiKey: string): string {
		return ui === uiKey ? 'text-text-primary' : 'text-text-muted';
	};

	return (
		<>
			<PaneHeader heading='Choose UI'>
				{/* json name editor */}
				<div className='flex gap-3'>
					{uiOptions.map(([uiKey, uiName]) => (
						<button
							className={`${getSelectedCls(uiKey)} `}
							key={uiKey}
							onClick={() => handleSelectUi(uiKey)}
						>
							{/* TODO: Show library icon instead */}
							<span className='inline-block w-max'>{uiName}</span>
						</button>
					))}
				</div>
			</PaneHeader>
		</>
	);
}

export function OutputGridRenderer() {
	const { error } = useContext(JsocGridDemoContext);

	return error ? <div className='text-red-700'>{error}</div> : <OutputGrid />;
}

function OutputGrid() {
	const { name, ui, json } = useContext(JsocGridDemoContext);

	if (!ui) {
		return;
	}

	const gridData = decode(json);
	let uiProps = getUiProps(name, ui as GridUiAdapterName);

	return (
		<div className={`h-full w-full`}>
			<JsocGrid data={gridData} ui={ui} uiProps={uiProps} />
		</div>
	);
}

function getUiProps(gridName: string, gridUi: GridUiAdapterName) {
	let uiProps;

	if (gridUi == 'mui') {
		uiProps = {} as GridUiAdapterComponentProps<'mui'>;
		uiProps.custom = {
			gridId: gridName,
		};

		uiProps.native = {
			sx: {
				'& .MuiDataGrid-columnHeaderTitle': {
					fontFamily: `"Segoe UI", Arial, sans-serif`, // since this app doesnt have Roboto so Header font was falling back to Arial which doesnt look bold on 500 weight unlike Roboto, Segoe UI.
				},
				'& .MuiDataGrid-cell': {
					fontFamily: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`, // for consistency with header font
				},
			},
		};
	} else {
		uiProps = {
			custom: { gridId: gridName },
			// native: { },
		};
	}

	return uiProps;
}

import { JsocGridDemoContext } from './GridDemo';
import { decode } from '@jsoc/core/utils';
import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';
import { useCallback, useContext } from 'react';
import { PaneContent, PaneHeader } from '../../../../components/Pane';

const uiOptions: Record<GridUiAdapterName, string> = {
	mui: 'MUI DataGrid',
	ag: 'AG-Grid',
};

export function OutputPane() {
	const { error } = useContext(JsocGridDemoContext);

	return (
		<>
			<PaneHeader title='UI'>
				{/* adapter selector */}
				<AdapterSelector />
			</PaneHeader>

			{/* output*/}
			<PaneContent className='h-96'>
				{error ? <ErrorMessage /> : <GridOutput />}
			</PaneContent>
		</>
	);
}

export function AdapterSelector() {
	const { ui, setUi } = useContext(JsocGridDemoContext);
	const handleSelectUi = useCallback((uiKey: GridUiAdapterName) => {
		setUi(uiKey);
	}, []);

	const getSelectedCls = function (uiKey: string): string {
		return ui === uiKey ? 'underline' : '';
	};

	return (
		<>
			{/* json name editor */}
			{Object.entries(uiOptions).map(([uiKey, uiName]) => (
				<button
					className={`${getSelectedCls(uiKey)} `}
					key={uiKey}
					onClick={() => handleSelectUi(uiKey as GridUiAdapterName)}
				>
					{/* TODO: Show library icon instead */}
					{uiName}
				</button>
			))}
		</>
	);
}

export function ErrorMessage() {
	const { error } = useContext(JsocGridDemoContext);

	return <div>{error}</div>;
}

export function GridOutput() {
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

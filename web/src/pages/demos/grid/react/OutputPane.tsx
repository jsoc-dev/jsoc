import { useCallback, useContext } from 'react';
import { JsocGridDemoContext } from './GridDemo';
import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';

const uiOptions: Record<GridUiAdapterName, string> = {
	mui: 'MUI DataGrid',
	ag: 'AG-Grid',
};

export function OutputPane() {
	const { gridUi, setGridUi } = useContext(JsocGridDemoContext);

	const handleSelectUi = useCallback((uiKey: GridUiAdapterName) => {
		setGridUi(uiKey);
	}, []);

	return (
		<>
			<div className='border border-blue-900 flex flex-col h-[500px] justify-center p-2 space-y-10 '>
				{/* adapter selector */}
				<div>
					{!gridUi && (
						<h1 className='text-center'>Select UI Adapter</h1>
					)}
					{/* adapters list */}
					<div className='flex justify-center space-x-4'>
						{Object.entries(uiOptions).map(([uiKey, uiName]) => (
							<button
								key={uiKey}
								onClick={() =>
									handleSelectUi(uiKey as GridUiAdapterName)
								}
								style={{
									padding: '6px 12px',
									background:
										gridUi === uiKey
											? '#e0e7ff'
											: '#f4f4f5',
									border: '1px solid #ccc',
									borderRadius: 6,
									cursor: 'pointer',
								}}
							>
								{uiName}
							</button>
						))}
					</div>
				</div>

				{/* render area */}
				<RenderArea />
			</div>
		</>
	);
}

function RenderArea() {
	const { gridUi, gridData } = useContext(JsocGridDemoContext);
	if (!gridUi) {
		return;
	}

	let uiProps = getUiProps('Examples', gridUi as GridUiAdapterName);

	return (
		<div className='h-96 max-h-96 min-h-96 w-full'>
			<JsocGrid data={gridData} ui={gridUi} uiProps={uiProps} />
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

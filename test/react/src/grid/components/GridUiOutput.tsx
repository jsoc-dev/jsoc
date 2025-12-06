import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';

import { JsocGridDemoContext } from '../JsocGridDemoContext';
import { useContext } from 'react';

export function GridUiOutput() {
	const { gridName, gridData, gridUi } = useContext(JsocGridDemoContext);

	let uiProps: GridUiAdapterComponentProps<GridUiAdapterName>;

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

	return (
		gridUi && (
			<div className='h-80 min-w-full m-1.5'>
				<JsocGrid data={gridData} ui={gridUi} uiProps={uiProps} />
			</div>
		)
	);
}

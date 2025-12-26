import { JsocGridDemoContext } from '../../GridDemo';
import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';
import { useContext } from 'react';

export function OutputGrid() {
	const { json, jsonOption, uiOption } = useContext(JsocGridDemoContext);

	if (!uiOption) {
		return;
	}

	const gridData = JSON.parse(json); // parsing without tryCatch here, as OutputGrid should be only rendered when json is valid
	let uiProps = getUiProps(jsonOption, uiOption);

	return (
		<div className={`h-full w-full`}>
			<JsocGrid data={gridData} ui={uiOption} uiProps={uiProps} />
		</div>
	);
}

function getUiProps<U extends GridUiAdapterName>(
	gridName: string,
	gridUi: U
): GridUiAdapterComponentProps<U> {
	let uiProps: GridUiAdapterComponentProps<U>;

	if (gridUi == 'mui') {
		uiProps = {
			custom: {
				gridId: gridName,
			},
			native: {
				sx: {
					'& .MuiDataGrid-columnHeaderTitle': {
						fontFamily: `"Segoe UI", Arial, sans-serif`, // since this app doesnt have Roboto so Header font was falling back to Arial which doesnt look bold on 500 weight unlike Roboto, Segoe UI.
					},
					'& .MuiDataGrid-cell': {
						fontFamily: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`, // for consistency with header font
					},
				},
			},
		} as GridUiAdapterComponentProps<U>;
	} else {
		uiProps = {
			custom: {
				gridId: gridName,
			},
		} as GridUiAdapterComponentProps<U>;
	}

	return uiProps;
}

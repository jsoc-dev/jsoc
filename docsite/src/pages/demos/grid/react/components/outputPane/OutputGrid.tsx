import { JsocGridDemoContext } from '../../GridDemo';
import {
	DefaultToolbarMui,
	JsocGrid,
} from '@jsoc/react/grid';
import { useContext } from 'react';
import { OutputGridAg } from './JsocGridAgCustomWrapper';

export function OutputGrid() {
	const { json, jsonOption, uiOption } = useContext(JsocGridDemoContext);

	if (!uiOption) {
		return;
	}

	const gridData = JSON.parse(json); // parsing without tryCatch here, as OutputGrid should be only rendered when json is valid

	return (
		<div className={`h-full w-full`}>
			{uiOption === 'ag' ? (
				<JsocGrid
					data={gridData}
					ui={uiOption}
					uiProps={{
						custom: {
							gridId: jsonOption,
						},
					}}
					CustomWrapper={OutputGridAg}
				/>
			) : uiOption === 'mui' ? (
				<JsocGrid
					data={gridData}
					ui={uiOption}
					uiProps={{
						custom: {
							gridId: jsonOption,
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
							showToolbar: true,
							slots: {
								toolbar: DefaultToolbarMui,
							},
						},
					}}
				/>
			) : null}
		</div>
	);
}

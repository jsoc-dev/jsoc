import { DefaultToolbarMui, JsocGrid } from '@jsoc/react/grid';
import { useOutputPaneBodyContext } from '../OutputPaneBody';

export function OutputGridMui() {
	const { gridData, selectedJsonOption } = useOutputPaneBodyContext();

	return (
		<JsocGrid
			data={gridData}
			ui={'mui'}
			uiProps={{
				custom: {
					gridId: selectedJsonOption,
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
	);
}

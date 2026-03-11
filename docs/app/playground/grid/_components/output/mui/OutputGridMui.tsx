import { DefaultToolbarMui, JsocGrid } from '@jsoc/react/grid';
import { useOutputPaneBodyContext } from '../OutputPaneBody';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export function OutputGridMui() {
	const { gridData, selectedJsonOption } = useOutputPaneBodyContext();
	const { resolvedTheme } = useTheme();

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: resolvedTheme === 'dark' ? 'dark' : 'light',
				},
			}),
		[resolvedTheme]
	);

	return (
		<ThemeProvider theme={theme}>
			<JsocGrid
				data={gridData}
				ui="mui"
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
		</ThemeProvider>
	);
}




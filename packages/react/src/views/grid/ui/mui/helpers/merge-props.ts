import { DataGridProps } from '@mui/x-data-grid';
import { JsocGridMuiDynamicProps, JsocGridMuiProps } from '../JsocGridMui';
import { isPlainObject } from '@jsoc/core';
import { JsocGridMuiDefaultToolbar } from '../JsocGridMuiDefaultToolbar';

export function mergeProps(
	receivedProps: JsocGridMuiProps,
	dynamicProps: JsocGridMuiDynamicProps
): DataGridProps {
	const mergedProps: DataGridProps = {
		...receivedProps,
		...dynamicProps,
	};

	if (mergedProps.showToolbar === false) {
		console.warn(
			`JsocGridNavigator is designed to be rendered inside Toolbar and it won't be rendered as the "showToolbar" prop is passed as false for Grid view. You won't be able to see nested data without it.`
		);
	} else {
		mergedProps.showToolbar = true;
	}

	if (isPlainObject(mergedProps.slots)) {
		console.warn(
			`Value for "slots" props was passed for Grid view. Default toolbar with JsocGridNavigator won't be rendered. Make sure to include the JsocGridNavigator component in your custom toolbar slots if the data is expected to be nested.`
		);
	} else {
		mergedProps.slots = {
			toolbar: JsocGridMuiDefaultToolbar,
		};
	}

	return mergedProps;
}

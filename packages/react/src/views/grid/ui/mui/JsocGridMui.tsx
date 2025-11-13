// _____________________ IMPORTS __________________
import { useContext } from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { SubsetKeysOf } from '@jsoc/core';
import { JsocGridContext } from '../../JsocGridContext';
import { COLUMN_GENERATOR_STORE } from './helpers/column-generator';
import { transformColumnSchemas } from '@jsoc/core/src/views/grid/column-mapper';
import { mergeProps } from './helpers/merge-props';
import { normaliseRows } from './helpers/rows-normalisor';

// _____________________ TYPES STARTED__________________
export type JsocGridMuiDynamicPropNames = SubsetKeysOf<
	DataGridProps,
	'rows' | 'columns'
>;

export type JsocGridMuiProps = Omit<
	DataGridProps,
	JsocGridMuiDynamicPropNames
>;

export type JsocGridMuiDynamicProps = Pick<
	DataGridProps,
	JsocGridMuiDynamicPropNames
>;

// _____________________ TYPES ENDED____________________

// NOTE: At runtime, even if parent doesn't send any props,
// React will still pass an empty object {} for adapterProps.
export function JsocGridMui(props: JsocGridMuiProps) {
	const { rootGridKey, gridColumnMapper, gridNavigatorStack } =
		useContext(JsocGridContext);

	const gridNavigatorStackCurrentItem = gridNavigatorStack.at(-1);

	let rows, columns;
	if (gridNavigatorStackCurrentItem) {
		rows = normaliseRows(gridNavigatorStackCurrentItem.gridData);
		columns = transformColumnSchemas<GridColDef>(
			gridColumnMapper[gridNavigatorStackCurrentItem.gridKey],
			COLUMN_GENERATOR_STORE
		);
		const mergedProps = mergeProps(props, { rows, columns });
		return <DataGrid {...mergedProps} />;
	} else {
		// this block should not be reached in normal scenarios
		// as this component whole purpose is to display grid when columns are present
		// and not handle error / no data cases which needs to be done at Outer Component
	}
}

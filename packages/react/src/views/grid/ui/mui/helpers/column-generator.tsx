import {
	ensureArray,
	getImageHtmlString,
	isImageLink,
	isPlainObject,
	joinImageOrStringValues,
	KvmKey,
} from '@jsoc/core';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { JsocGridExpander } from '../../../components/JsocGridExpander';
import { ColumnGeneratorStore } from '@jsoc/core/src/views/grid/column-mapper';

export const COLUMN_GENERATOR_STORE: ColumnGeneratorStore<GridColDef> = {
	text: getNewTextColumn,
	date: getNewDateColumn,
	expander: getNewExpanderColumn,
};

export function getNewTextColumn(key: KvmKey): GridColDef {
	return {
		field: String(key),
		headerName: String(key),
		renderCell: (params: GridRenderCellParams) => {
			const { row, value } = params;
			row;

			if (Array.isArray(value)) {
				return joinImageOrStringValues(value);
			}
			if (isImageLink(value)) {
				return getImageHtmlString(value);
			}
			return value;
		},
	};
}

export function getNewDateColumn(key: KvmKey): GridColDef {
	return {
		field: String(key),
		headerName: String(key),
		renderCell: (params: GridRenderCellParams) => {
			params.value;

			return 'Date Col';
		},
	};
}

export function getNewExpanderColumn(key: KvmKey): GridColDef {
	return {
		field: String(key),
		headerName: String(key),
		renderCell: (params: GridRenderCellParams) => {
			const { row, value } = params;
			row;
			if (isPlainObject(value) || Array.isArray(value)) {
				const gridData = ensureArray(value);
				return <JsocGridExpander gridKey={key} gridData={gridData} />;
			}
		},
	};
}

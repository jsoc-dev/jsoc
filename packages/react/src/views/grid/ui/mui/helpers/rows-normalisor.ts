import { GridRowsProp } from "@mui/x-data-grid";
import { GridNavigatorStackItemData } from "../../../JsocGridContext";
import { isPlainObject } from "@jsoc/core";

export function normaliseRows(gridData: GridNavigatorStackItemData): GridRowsProp {
	return gridData.filter(isPlainObject).map(ensureRowHasId);
}

function ensureRowHasId(row: Record<PropertyKey, unknown>, index: number) {
	if (!('id' in row)) {
		row.id = crypto.randomUUID();
	}

	return row;
}

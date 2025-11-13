// _____________________ IMPORTS __________________
import { isPlainObject } from '../../util/';
import { isConvertibleToDate } from '../../util/';
import { ownEntries } from '../../util/';
import { type KvmKey, type KeyValueMapper, GridKey } from '../grid';

// _____________________ EXPORTS __________________
export type ColumnId = KvmKey;
export type ColumnType = 'expander' | 'date' | 'text';
export type ColumnSchema = {
	id: ColumnId;
	type: ColumnType;
};

export type GridColumnMapper = Record<GridKey, ColumnSchema[]>;
export function getGridColumnMapper(
	keyValueMapper: KeyValueMapper
): GridColumnMapper {
	const gridKeys = getGridKeys(keyValueMapper);

	const mapper: GridColumnMapper = {};
	for (const key of gridKeys) {
		mapper[key] = getGridColumnsSchema(key, keyValueMapper, gridKeys);
	}
	return mapper;
}

function getGridKeys(keyValueMapper: KeyValueMapper): GridKey[] {
	const gridKeys = [];

	for (const [key, value] of ownEntries(keyValueMapper)) {
		if (
			value.some((x) => isPlainObject(x)) ||
			value.some(
				(x) => Array.isArray(x) && x.some((y) => isPlainObject(y))
			)
		) {
			gridKeys.push(key);
		}
	}

	return gridKeys;
}

function getGridColumnsSchema(
	key: GridKey,
	keyValueMapper: KeyValueMapper,
	gridKeys: KvmKey[]
): ColumnSchema[] {
	const allRowsOfThisGrid = keyValueMapper[key]
		.flat() // flattening inner values which are Array(multiple rows)
		.filter((r) => r != null); // removing null values

	// finding all the unique columns from allRowsOfThisGrid
	const allColumnsOfThisGrid: KvmKey[] = [];

	for (const row of allRowsOfThisGrid) {
		for (const rowColumn of Object.keys(row)) {
			if (!allColumnsOfThisGrid.includes(rowColumn)) {
				allColumnsOfThisGrid.push(rowColumn);
			}
		}
	}

	const columns = [];
	// getting suitable column configuration object for each columns
	for (const key of allColumnsOfThisGrid) {
		const allRowsOfThisColumn = keyValueMapper[key].flat();
		// TODO: add helper for boolean values,
		if (gridKeys.includes(key)) {
			const col: ColumnSchema = {
				id: key,
				type: 'expander',
			};
			columns.push(col);
		} else if (allRowsOfThisColumn.some(isConvertibleToDate)) {
			const col: ColumnSchema = {
				id: key,
				type: 'date',
			};
			columns.push(col);
		} else {
			const col: ColumnSchema = {
				id: key,
				type: 'text',
			};
			columns.push(col);
		}
	}

	return columns;
}

// -----
export type ColumnGenerator<C> = (key: KvmKey) => C;
export type ColumnGeneratorStore<C> = Record<ColumnType, ColumnGenerator<C>>;

export function transformColumnSchemas<C>(
	columnSchemas: ColumnSchema[],
	columnGeneratorStore: ColumnGeneratorStore<C>
): C[] {
	return columnSchemas.map(({ id, type }) => columnGeneratorStore[type](id));
}

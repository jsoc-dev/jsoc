import { isConcreteObject, isPlainObject } from '../../util/object';
import { ensureArray } from '../../util/array';
import { isString, parseString } from '../../util/string';
import {
	ArrayOfArraysError,
	GridDataNotAnArrayError,
	NoConcreteObjectInArrayError,
	NoObjectInArrayError,
} from '../../errors';

// TYPES
export type KvmKey = symbol | string;
export type KvmValue = unknown;
export type KeyValueMapper = Record<KvmKey, KvmValue[]>;
export type GridKey = KvmKey;
export type GridData = unknown[];
export type RootGridKey = GridKey;
export type RootGridData = GridData; // should pass validateRootGridData as well

// VARIABLES
export function getRootGridKeyAndData(
	data: unknown
): [RootGridKey, RootGridData] | never {
	const { rootGridData, rootGridKey } = preprocessData(data);
	validateRootGridData(rootGridData);

	return [rootGridKey, rootGridData];
}

function preprocessData(data: unknown) {
	let rootGridKey: RootGridKey = Symbol('rootKey');
	let rootGridData = data;

	if (isString(rootGridData)) {
		rootGridData = parseString(rootGridData);
	}

	if (isPlainObject(rootGridData)) {
		const resultKeys = Object.keys(rootGridData);
		const resultFirstKey = resultKeys[0];
		const resultFirstValue = rootGridData[resultFirstKey];

		if (resultKeys.length === 1 && isPlainObject(resultFirstValue)) {
			rootGridKey = resultFirstKey;
			rootGridData = resultFirstValue;
		}

		rootGridData = ensureArray(rootGridData);
	}

	return {
		rootGridData,
		rootGridKey,
	};
}

function validateRootGridData(
	rootGridData: unknown
): asserts rootGridData is RootGridData {
	if (Array.isArray(rootGridData)) {
		if (rootGridData.some(Array.isArray)) {
			throw new ArrayOfArraysError(rootGridData);
		} else if (rootGridData.every(isPlainObject)) {
			// all elements in rootData are object
		} else if (rootGridData.some(isPlainObject)) {
			// some elements in rootData are object
			console.warn(
				'Not all elements in Root Grid data are objects. Non object elements will be ignored'
			);
		} else {
			throw new NoObjectInArrayError(rootGridData);
		}

		// now, rootData is an array containg atleast one object element
		if (rootGridData.some((x) => isPlainObject(x) && isConcreteObject(x))) {
			// now, there is atleast one concrete object element in rootData array
		} else {
			throw new NoConcreteObjectInArrayError(rootGridData);
		}
	} else {
		throw new GridDataNotAnArrayError(rootGridData);
	}
}

export function getKeyValueMapper(
	rootGridKey: KvmKey,
	rootGridData: RootGridData
): KeyValueMapper | never {
	const keyValueMapper = {
		[rootGridKey]: rootGridData,
	};

	buildKeyValueMapper(rootGridData, keyValueMapper);
	return keyValueMapper;
}

function buildKeyValueMapper(
	node: unknown,
	keyValueMapper: KeyValueMapper
): void {
	if (Array.isArray(node)) {
		if (node.some(Array.isArray)) {
			throw new ArrayOfArraysError(node);
		}
		for (const element of node) {
			buildKeyValueMapper(element, keyValueMapper);
		}
	} else if (isPlainObject(node)) {
		const entries = Object.entries(node);

		for (const [key, value] of entries) {
			keyValueMapper[key] =
				key in keyValueMapper ? keyValueMapper[key] : [];
			keyValueMapper[key].push(value);
			buildKeyValueMapper(value, keyValueMapper);
		}
	}
}

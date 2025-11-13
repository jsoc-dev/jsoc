import { createContext } from 'react';
import { KeyValueMapper, KvmKey, RootGridKey, RootGridData } from '@jsoc/core';
import { GridColumnMapper } from '../../../../core/src/views/grid/column-mapper';

//types
export type GridNavigatorStackItemData = RootGridData;
export type GridNavigatorStackItem = {
	gridKey: KvmKey;
	gridData: GridNavigatorStackItemData;
};
export type GridNavigatorStack = GridNavigatorStackItem[];

interface JsocGridContext {
	rootGridKey: RootGridKey;
	keyValueMapper: KeyValueMapper;
	gridColumnMapper: GridColumnMapper;
	gridNavigatorStack: GridNavigatorStack,
	setGridNavigatorStack: React.Dispatch<
		React.SetStateAction<GridNavigatorStack | undefined>
	>;
}

const JsocGridContextFake: JsocGridContext = {
	rootGridKey: '',
	keyValueMapper: {},
	gridColumnMapper: {},
	gridNavigatorStack: [],
	setGridNavigatorStack: () => {},
};

export const JsocGridContext = createContext(JsocGridContextFake);

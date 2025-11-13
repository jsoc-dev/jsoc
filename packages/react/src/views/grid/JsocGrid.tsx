import { useMemo, useState } from 'react';
import { JsocData, JsocViewProps } from '../../Jsoc';
import { JsocGridContext } from './JsocGridContext';
import { Ui, View } from '../../registry';

// _____________________IMPORTS ENDED__________________

export function JsocGrid<V extends View, U extends Ui<V>>({
	data,
	viewAdapter: ViewAdapter,
	viewAdapterProps,
}: JsocViewProps<V, U>) {
	const initialStateValues = useMemo(() => {
		return getInitialValues(data);
	}, [data]);

	const [error] = useState(initialStateValues.error);
	const [rootGridKey] = useState(initialStateValues.rootGridKey);
	const [keyValueMapper] = useState(initialStateValues.keyValueMapper);
	const [gridColumnMapper] = useState(initialStateValues.gridColumnMapper);
	const [gridNavigatorStack, setGridNavigatorStack] = useState(
		initialStateValues.gridNavigatorStack
	);

	if (
		rootGridKey &&
		keyValueMapper &&
		gridColumnMapper &&
		gridNavigatorStack
	) {
		return (
			<JsocGridContext.Provider
				value={{
					rootGridKey,
					keyValueMapper,
					gridColumnMapper,
					gridNavigatorStack,
					setGridNavigatorStack,
				}}
			>
				<ViewAdapter {...viewAdapterProps}/>
			</JsocGridContext.Provider>
		);
	}
}


// -------------------------

import { getKeyValueMapper, getRootGridKeyAndData, KeyValueMapper, RootGridKey } from "@jsoc/core";
import { getGridColumnMapper, GridColumnMapper } from "../../../../core/src/views/grid/column-mapper";
import { GridNavigatorStack, GridNavigatorStackItem } from "./JsocGridContext";

type InitialStateValues = {
    error?: unknown;
    rootGridKey?: RootGridKey;
    keyValueMapper?: KeyValueMapper;
    gridColumnMapper?: GridColumnMapper;
    gridNavigatorStack?: GridNavigatorStack;
};

export function getInitialValues(data: JsocData): InitialStateValues {
    try {
        const [rootGridKey, rootGridData] = getRootGridKeyAndData(data);
        const keyValueMapper = getKeyValueMapper(rootGridKey, rootGridData);
        const gridColumnMapper = getGridColumnMapper(keyValueMapper);
        const gridNavigatorStackRootItem: GridNavigatorStackItem = {
            gridKey: rootGridKey || '',
            gridData:
                rootGridKey && keyValueMapper
                    ? keyValueMapper[rootGridKey]
                    : [],
        };
        const gridNavigatorStack = [gridNavigatorStackRootItem];

        return {
            rootGridKey,
            keyValueMapper,
            gridColumnMapper,
            gridNavigatorStack,
        };
    } catch (error) {
        console.log(error);
        // handle no data case
        // handle invalid data or parsing error case
        return {
            error,
        };
    }
}

import {
	GRID_UI_ADAPTERS,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from './adapter-registry';
import { PlainObject } from '@jsoc/core';
import {
	FALLBACK_ROOT_GRID_ID,
	type GridDataReadonly,
	type GridSchemaStore,
	initGridSchemaStore,
} from '@jsoc/core/grid';
import {
	type FC,
	type JSX,
	type ReactNode,
	type Dispatch,
	type SetStateAction,
	useState,
	useEffect,
	createContext,
	Activity,
} from 'react';

export type JsocGridProps<U extends GridUiAdapterName> = {
	data: GridDataReadonly;
	children?: ReactNode;
	ui: U;
	uiProps?: GridUiAdapterComponentProps<U>;
	/**
	 * Allows consumer to wrap or transform the UiAdapter component by providing a render function
	 * @default (adapter) => adapter
	 */
	uiRenderer?: (adapter: JSX.Element) => JSX.Element;
	/**
	 * If `false`, the default navigator won't be rendered
	 * @default true
	 */
	showDefaultNavigator?: boolean;
};

export type JsocGridContextValue = {
	gridSchemaStore: GridSchemaStore;
	setGridSchemaStore: Dispatch<SetStateAction<GridSchemaStore>>;
	showDefaultNavigator: boolean;
};

export const JsocGridContext = createContext<JsocGridContextValue>({
	gridSchemaStore: [],
	setGridSchemaStore: () => {},
	showDefaultNavigator: true,
});

export function JsocGrid<U extends GridUiAdapterName>({
	data,
	ui,
	uiProps,
	uiRenderer = (adapter) => adapter, // default renderer just returns the adapter as it is
	showDefaultNavigator = true,
}: JsocGridProps<U>) {
	const rootGridId = uiProps?.custom?.gridId || FALLBACK_ROOT_GRID_ID;
	const [gridSchemaStore, setGridSchemaStore] = useState(
		initGridSchemaStore(rootGridId, data)
	);

	useEffect(() => {
		setGridSchemaStore(initGridSchemaStore(rootGridId, data));
	}, [rootGridId, data]);

	const UiAdapter = GRID_UI_ADAPTERS[ui] as FC<
		GridUiAdapterComponentProps<U> | PlainObject
	>;

	return (
		<JsocGridContext.Provider
			value={{
				gridSchemaStore,
				setGridSchemaStore,
				showDefaultNavigator,
			}}
		>
			{gridSchemaStore.map((gridSchema) => (
				<Activity
					key={gridSchema.gridId}
					mode={gridSchema.isActiveGrid ? 'visible' : 'hidden'}
				>
					{uiRenderer(
						<UiAdapter
							{...uiProps}
							{...{
								custom: {
									...uiProps?.custom,
									gridId: gridSchema.gridId, // need to supplied always and use the id of gridSchema, not the consumer provided which is only for root grid
								},
							}}
						/>
					)}
				</Activity>
			))}
		</JsocGridContext.Provider>
	);
}

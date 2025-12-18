import {
	type GridUiAdapterName,
	type GridUiAdapterComponent,
	type GridUiAdapterComponentProps,
	GRID_UI_ADAPTERS,
} from './adapter-registry';
import { PlainObject } from '@jsoc/core/utils';
import {
	type GridDataReadonly,
	type GridSchemaStore,
	initGridSchemaStore,
	FALLBACK_ROOT_GRID_ID,
} from '@jsoc/core/grid';
import {
	type FC,
	type JSX,
	type ReactNode,
	type ReactElement,
	type Dispatch,
	type SetStateAction,
	useState,
	useEffect,
	createContext,
	Activity,
} from 'react';

export type JsocGridContextValue = {
	gridSchemaStore: GridSchemaStore;
	setGridSchemaStore: Dispatch<SetStateAction<GridSchemaStore>>;
	showDefaultNavigator: boolean;
};

export const JsocGridContext = createContext<JsocGridContextValue>({
	gridSchemaStore: [],
	setGridSchemaStore: () => undefined,
	showDefaultNavigator: true,
});

export type JsocGridProps<U extends GridUiAdapterName> = {
	data: GridDataReadonly;
	children?: ReactNode;
	ui: U;
	uiProps?: GridUiAdapterComponentProps<U>;
	/**
	 * A custom render function provided by consumer. 
	 * Using this, consumer can wrap the UiAdapter element in any custom components if needed.
	 * @default (uiAdapterEl) => uiAdapterEl
	 */
	uiRenderer?: (uiAdapterEl: ReactElement<GridUiAdapterComponent<U>>) => JSX.Element;
	/**
	 * If `false`, the default navigator won't be rendered
	 * @default true
	 */
	showDefaultNavigator?: boolean;
};

export function JsocGrid<U extends GridUiAdapterName>({
	data,
	ui,
	uiProps,
	uiRenderer = (uiAdapterEl) => uiAdapterEl, // default renderer just returns the uiAdapterEl as it is
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

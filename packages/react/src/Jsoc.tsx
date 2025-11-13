import { FC } from 'react';
import {
	type View,
	type Ui,
	VIEW_REGISTRY,
	ADAPTER_REGISTRY,
	ViewAdapterProps,
} from './registry';
import { JsocInvalidViewError, JsocInvalidAdapterError } from '@jsoc/core';

export type JsocData = unknown;

export type JsocProps<V extends View, U extends Ui<V>> = {
	data: JsocData;
	view: V;
	ui: U;
	viewAdapterProps?: ViewAdapterProps<V, U>;
};

export type JsocViewProps<V extends View, U extends Ui<V>> = {
	data: JsocData;
	viewAdapter: FC<ViewAdapterProps<V, U> | {}>;
	viewAdapterProps?: ViewAdapterProps<V, U>;
};

// ROOT COMPONENT
export function Jsoc<V extends View, U extends Ui<V>>({
	data,
	view,
	ui,
	viewAdapterProps,
}: JsocProps<V, U>) {
	validateJsocProps(view, ui);

	const JsocView = VIEW_REGISTRY[view] as FC<JsocViewProps<V, U>>;
	// JsocViewAdapter can be resolved in View component as well but doing it here to avoid repetition code to resolve adapter in each View
	// also, if we do it in View component, then we need to pass Ui<V> generic from here to View component 
	const JsocViewAdapter = ADAPTER_REGISTRY[view][ui] as FC<
		ViewAdapterProps<V, U> | {}
	>;
	return (
		<JsocView
			data={data}
			viewAdapter={JsocViewAdapter}
			viewAdapterProps={viewAdapterProps}
		/>
	);
}

function validateJsocProps<V extends View>(view: V, ui: Ui<V>) {
	if (!(view in VIEW_REGISTRY)) {
		throw new JsocInvalidViewError(view, Object.keys(VIEW_REGISTRY));
	}

	if (!(ui in ADAPTER_REGISTRY[view])) {
		throw new JsocInvalidAdapterError(
			view,
			ui,
			Object.keys(ADAPTER_REGISTRY[view])
		);
	}
}

// test props
// Jsoc({ data: '', view: 'grid', ui: 'mui', adapterProps: { slots: {} } });

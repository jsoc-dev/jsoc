import { PaneHeader } from './PaneHeader';
import { JsocGridDemoContext, type DemoGridUi } from '../GridDemo';
import {
	JsocGrid,
	type GridUiAdapterComponentProps,
	type GridUiAdapterName,
} from '@jsoc/react/grid';
import { useCallback, useContext } from 'react';
import { ErrorMessage } from '../../../../../components/ErrorMessage';

const uiOptions: [DemoGridUi, string][] = [
	['mui', 'MUI X'],
	['ag', 'AG-Grid'],
];

export function UiSelector() {
	const { ui, setUi } = useContext(JsocGridDemoContext);
	const handleSelectUi = useCallback((uiKey: DemoGridUi) => {
		setUi(uiKey);
	}, []);

	const getSelectedCls = function (uiKey: string): string {
		return ui === uiKey ? 'text-text-primary' : 'text-text-muted';
	};

	return (
		<>
			<PaneHeader heading='Choose UI'>
				{/* json name editor */}
				<div className='flex gap-3'>
					{uiOptions.map(([uiKey, uiName]) => (
						<button
							className={`${getSelectedCls(uiKey)} `}
							key={uiKey}
							onClick={() => handleSelectUi(uiKey)}
						>
							{/* TODO: Show library icon instead */}
							<span className='inline-block w-max'>{uiName}</span>
						</button>
					))}
				</div>
			</PaneHeader>
		</>
	);
}

export function OutputGridRenderer() {
	const { name, error } = useContext(JsocGridDemoContext);

	return error ? (
		<ErrorMessage
			type={error?.type || 'Error'}
			message={error.message}
			fileName={name + '.json'}
		/>
	) : (
		<OutputGrid />
	);
}

function OutputGrid() {
	const { name, ui, json } = useContext(JsocGridDemoContext);

	if (!ui) {
		return;
	}

	const gridData = JSON.parse(json); // parsing without tryCatch here, as OutputGrid should be only rendered when json is valid
	let uiProps = getUiProps(name, ui);

	return (
		<div className={`h-full w-full`}>
			<JsocGrid data={gridData} ui={ui} uiProps={uiProps} />
		</div>
	);
}

function getUiProps<U extends GridUiAdapterName>(
	gridName: string,
	gridUi: U
): GridUiAdapterComponentProps<U> {
	let uiProps: GridUiAdapterComponentProps<U>;

	if (gridUi == 'mui') {
		uiProps = {
			custom: {
				gridId: gridName,
			},
			native: {
				sx: {
					'& .MuiDataGrid-columnHeaderTitle': {
						fontFamily: `"Segoe UI", Arial, sans-serif`, // since this app doesnt have Roboto so Header font was falling back to Arial which doesnt look bold on 500 weight unlike Roboto, Segoe UI.
					},
					'& .MuiDataGrid-cell': {
						fontFamily: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`, // for consistency with header font
					},
				},
			},
		} as GridUiAdapterComponentProps<U>;
	} else {
		uiProps = {
			custom: {
				gridId: gridName,
			},
		} as GridUiAdapterComponentProps<U>;
	}

	return uiProps;
}

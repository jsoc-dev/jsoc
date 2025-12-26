import { PaneHeader } from '../PaneHeader';
import { JsocGridDemoContext, type DemoGridUiOption } from '../../GridDemo';
import { useCallback, useContext } from 'react';

const uiOptions: [DemoGridUiOption, string][] = [
	['mui', 'MUI X'],
	['ag', 'AG-Grid'],
];

export function UiOptions() {
	const { uiOption, setUiOption } = useContext(JsocGridDemoContext);
	const onUiOptionClick = useCallback((uiKey: DemoGridUiOption) => {
		setUiOption(uiKey);
	}, []);

	const getSelectedCls = function (uiKey: string): string {
		return uiOption === uiKey ? 'text-text-primary' : 'text-text-muted';
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
							onClick={() => onUiOptionClick(uiKey)}
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

import { PaneHeader } from '../PaneHeader';
import { JsocGridDemoContext, type DemoGridJsonOption } from '../../GridDemo';
import { DEMO_GRID_JSON_MAP, DEMO_GRID_JSON_OPTIONS } from '../../utils/jsonMap';
import { useCallback, useContext } from 'react';

export function JsonOptions() {
	const { jsonOption, setJson, setJsonOption } = useContext(JsocGridDemoContext);
	const onJsonOptionClick = useCallback((jsonOption: DemoGridJsonOption) => {
		setJsonOption(jsonOption);
		setJson(DEMO_GRID_JSON_MAP[jsonOption]);
	}, []);

	const getSelectedCls = function (uiKey: string): string {
		return jsonOption === uiKey ? 'text-text-primary' : 'text-text-muted';
	};

	return (
		<>
			<PaneHeader heading='Choose JSON'>
				{/* json name editor */}
				<div className='flex gap-3'>
					{DEMO_GRID_JSON_OPTIONS.map((jsonOption) => (
						<button
							className={`${getSelectedCls(jsonOption)} `}
							key={jsonOption}
							onClick={() => onJsonOptionClick(jsonOption)}
						>
							<span className='inline-block w-max'>
								{jsonOption}
							</span>
						</button>
					))}
				</div>
			</PaneHeader>
		</>
	);
}


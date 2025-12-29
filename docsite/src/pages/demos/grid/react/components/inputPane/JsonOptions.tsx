import { PaneHeader } from '../PaneHeader';
import { JsocGridDemoContext, type DemoGridJsonOption } from '../../GridDemo';
import { DEMO_GRID_JSON_MAP, DEMO_GRID_JSON_OPTIONS } from '../../utils/jsonMap';
import { useCallback, useContext } from 'react';
import { validateCode } from 'code-editor';

export function JsonOptions() {
	const { jsonOption, setJson, setJsonError, setJsonOption } = useContext(JsocGridDemoContext);
	const onJsonOptionClick = useCallback((jsonOption: DemoGridJsonOption) => {
		const newJson = DEMO_GRID_JSON_MAP[jsonOption];
		setJsonOption(jsonOption);
		setJson(newJson);
		setJsonError(validateCode(newJson, 'json'));
		// TODO: use composite state for option,json,error, currently the design is 
		// prone to bugs like the jsonOption is updated somewhere without updating jsonError.
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


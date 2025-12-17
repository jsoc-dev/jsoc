import { useContext } from 'react';
import { prettyStringify } from '@jsoc/core';
import { JsocGridDemoContext } from './GridDemo';

export function InputPane() {
	const {
		gridData,
		setGridData,
		gridDataError,
		setGridDataError,
	} = useContext(JsocGridDemoContext);

	return (
		<div className='border border-red-950 flex flex-col p-2'>
			<div className='text-center'>Choose JSON examples below or enter your own custom JSON</div>
			<textarea
				spellCheck="false"

				defaultValue={prettyStringify(
					gridData
				)}

				onChange={(e) => {
					const raw = e.target.value
					try {
						const parsed = JSON.parse(raw);
						setGridData(parsed);
						setGridDataError('');
					} catch (err: unknown) {
						setGridDataError(String(err));
					}
				}}
				style={{
					width: '100%',
					height: '200px',
					fontFamily: 'monospace',
					fontSize: '14px',
					border: '2px solid ' + (gridDataError ? 'red' : 'black'),
					color: (gridDataError ? 'red' : 'black')
				}}
			/>
			{
				gridDataError && (
					<div>{gridDataError}</div>
				)
			}
		</div>
	);
}

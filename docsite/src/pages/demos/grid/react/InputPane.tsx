import { useContext } from 'react';
import { InputJson } from '../../../../components/InputJson';
import { JsocGridDemoContext } from './GridDemo';
import { InputText } from '../../../../components/InputText';
import { PaneContent, PaneHeader } from '../../../../components/Pane';

export function InputPane() {
	const { name, setName, json, setJson, error, setError } =
		useContext(JsocGridDemoContext);

	return (
		<>
			<PaneHeader title='JSON'>
				{/* json name editor */}
				<InputText
					value={name}
					className='inline-flex text-right '
					setValue={setName}
				/>
			</PaneHeader>

			<PaneContent className='min-h-96'>
				{/* json value editor */}
				<InputJson
				/>
			</PaneContent>
				value={json}
				setValue={setJson}
				error={error}
				setError={setError}
		</>
	);
}

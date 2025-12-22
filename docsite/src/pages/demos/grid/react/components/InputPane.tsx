import { PaneHeader } from './PaneHeader';
import { JsocGridDemoContext } from '../GridDemo';
import { InputJson } from '../../../../../components/InputJson';
import { InputText } from '../../../../../components/InputText';
import { useContext } from 'react';

export function JsonSelector() {
	const { name, setName } = useContext(JsocGridDemoContext);

	return (
		<>
			<PaneHeader heading='Edit JSON'>
				<InputText
					value={name}
					placeholder='Enter JSON name'
					className='
						bg-transparent border-b border-b-outline-subtle 
						inline
						text-text-muted
						w-max'
					setValue={setName}
				/>
			</PaneHeader>
		</>
	);
}

export function InputJsonRenderer() {
	const { json, setJson, error, setError } = useContext(JsocGridDemoContext);

	return (
		<div className='flex h-full'>
			{/* json value editor */}
			<InputJson
				value={json}
				setValue={setJson}
				error={error}
				setError={setError}
			/>
		</div>
	);
}

import { useContext } from 'react';
import { InputJson } from '../../../../components/InputJson';
import { JsocGridDemoContext } from './GridDemo';
import { InputText } from '../../../../components/InputText';

export function JsonSelector() {
	const { name, setName } = useContext(JsocGridDemoContext);

	return (
		<>
			<div className='h-full w-full flex justify-between'>
				<div>Edit JSON</div>
				<span className='bg-outline-subtle'></span>
				<InputText
					value={name}
					className='inline-flex text-right '
					setValue={setName}
				/>
			</div>
		</>
	);
}

export function InputJsonRenderer() {
	const { json, setJson, error, setError } = useContext(JsocGridDemoContext);

	return (
		<>
			{/* json value editor */}
			<InputJson
				value={json}
				setValue={setJson}
				error={error}
				setError={setError}
			/>
		</>
	);
}

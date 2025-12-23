import { PaneHeader } from './PaneHeader';
import { JsocGridDemoContext } from '../GridDemo';
import { InputText } from '../../../../../components/InputText';
import { useContext } from 'react';
import { CodeEditor } from '../../../../../components/code-editor/CodeEditor';

export function JsonSelector() {
	const { name, setName } = useContext(JsocGridDemoContext);

	return (
		<>
			<PaneHeader heading='Edit JSON'>
				<InputText
					className='
						border-b border-b-outline-subtle 
						text-text-muted
					'
					placeholder='Enter JSON name'
					value={name}
					setValue={setName}
				/>
			</PaneHeader>
		</>
	);
}

export function InputJsonRenderer() {
	const { 
		name, 
		json, 
		setJson, 
		error, 
		setError 
	} =
		useContext(JsocGridDemoContext);

	return (
		<div className='flex h-full'>
			{/* json value editor */}
			<CodeEditor
				className='flex-1'
				code={json}
				codeError={error}
				codeLang='json'
				highlightCls='bg-red-100'
				highlightLines={error?.line ? [error?.line] : []}
				fileName={name}
				setCode={setJson}
				setCodeError={setError}
			/>
		</div>
	);
}

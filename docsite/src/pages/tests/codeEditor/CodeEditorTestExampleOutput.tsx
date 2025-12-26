import { useState } from 'react';
import {
	CodeEditor,
	type Code,
	type CodeLineNumber,
} from '../../../components/code-editor/CodeEditor';

export function CodeEditorTestExampleOutput({
	exampleCode,
	editable,

	highlightLines,
}: {
	exampleCode: Code;
	editable?: boolean;

	highlightLines: CodeLineNumber[];
}) {
	const [code, setCode] = useState(exampleCode);

	return (
		<CodeEditor
			code={code}
			{...(editable && {
				setCode: setCode,
			})}
			codeLang='cmd'
			highlightLines={highlightLines}
		/>
	);
}

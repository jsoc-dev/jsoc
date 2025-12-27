import { useState } from 'react';
import {
	CodeEditor,
	type Code,
	type CodeLineNumber,
} from '../../../components/code-editor/CodeEditor';

export function CodeEditorTestExampleOutput({
	exampleCode,
	highlightLines,
}: {
	exampleCode: Code;
	highlightLines: CodeLineNumber[];
}) {
	const [code, setCode] = useState(exampleCode);

	return (
		<CodeEditor
			code={code}
			setCode= {setCode}
			codeLang='cmd'
			highlightLines={highlightLines}
		/>
	);
}

import { useContext } from 'react';
import { CodeEditorContext } from '../CodeEditor';
import { CODE_LANGUAGES } from '../utils/codeLanguageUtil';

export function CodeEditorTitlebar() {
	const { fileName, codeLang } = useContext(CodeEditorContext);
	const { name } = CODE_LANGUAGES[codeLang];
	
	return (
		<span className=''>{fileName ? fileName + '.' + codeLang : name}</span>
	);
}

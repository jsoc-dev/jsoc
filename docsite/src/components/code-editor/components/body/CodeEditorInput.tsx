import { useContext, useCallback } from 'react';
import { CodeEditorContext, type Code } from '../../CodeEditor';
import { validateCode } from '../../utils/codeLanguageUtil';
import {
	convertVirtualLinesToCode,
	createVirtualLines,
	sanitizeCode,
} from '../../utils/virtualLinesUtil';
import { onKeyDown	 } from '../../utils/eventHandling/keyboardEvent';
import { onPaste } from '../../utils/eventHandling/clipboardEvent';

 //TODO 
 // handle delete, 
 // selection + backspace,delete
 // ctrl/shift + key
 // zwsp navigation / backspace
export function CodeEditorInput({ className }: { className?: string }) {
	const {
		codeLang,
		isWrapEnabled,
		virtualLinesContentRef,
		setCode,
		setCodeError,
	} = useContext(CodeEditorContext);

	const updateCode = useCallback(
		(code: Code) => {
			virtualLinesContentRef.current = createVirtualLines(code);
			const sanitized = sanitizeCode(code);
			setCode?.(sanitized);
			setCodeError?.(validateCode(sanitized, codeLang));
		},
		[setCode, setCodeError]
	);

	const setInitialCode = (pre: HTMLPreElement | null) => {
		if (!pre) return;

		const initialCode = convertVirtualLinesToCode(virtualLinesContentRef.current);
		if (pre.innerHTML !== initialCode) {
			console.info('CodeEditor: Setting initial code in input element.');
			pre.innerHTML = initialCode;
		}
	};

	return (
		<pre
			className={`${className}
				${isWrapEnabled ? 'pl-12' : ''}
				text-transparent/20 caret-black
				focus:outline-none
			`}
			contentEditable={!!setCode}
			onKeyDown={(e) => onKeyDown(e, updateCode)}
			onPaste={(e) => onPaste(e, updateCode)}
			ref={(pre) => setInitialCode(pre)}
			spellCheck={false}
		/>
	);
}

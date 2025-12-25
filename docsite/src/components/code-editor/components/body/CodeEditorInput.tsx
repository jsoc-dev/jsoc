import { useContext, useCallback } from 'react';
import { CodeEditorContext, type Code } from '../../CodeEditor';
import { validateCode } from '../../utils/codeLanguageUtil';
import { codeToVirtualLines, sanitizeCode, virtualLinesToCode } from '../../utils/virtualLinesUtil';
import { onKeyDown, onPaste } from '../../utils/userInput/eventHandlers';

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
			virtualLinesContentRef.current = codeToVirtualLines(code);
			setCode?.(code);
			setCodeError?.(validateCode(code, codeLang));
		},
		[setCode, setCodeError]
	);

	const setInitialCode = (pre: HTMLPreElement | null) => {
		if (!pre) return;

		const code = virtualLinesToCode(virtualLinesContentRef.current);
		if (pre.textContent !== code) {
			pre.textContent = code;
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

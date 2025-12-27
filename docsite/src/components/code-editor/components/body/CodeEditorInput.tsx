import { useContext, useCallback, useRef, useEffect } from 'react';
import { CodeEditorContext, type Code } from '../../CodeEditor';
import { validateCode } from '../../utils/codeLanguageUtil';
import {
	convertToExternalCode,
	convertToInternalCode,
} from '../../utils/virtualLinesUtil';
import { onKeyDown } from '../../utils/eventHandling/keyboardEvent';
import { onPaste } from '../../utils/eventHandling/clipboardEvent';

export function CodeEditorInput({ lineCls }: { lineCls: string }) {
	const inputRef = useRef<HTMLPreElement>(null);
	const {
		code,
		codeInternalRef,
		codeLang,
		isWrapEnabled,
		setCode,
		setCodeError,
	} = useContext(CodeEditorContext);

	const setInternalHtmlOnce = () => {
		const inputEl = inputRef.current;
		if (!inputEl) return;

		inputEl.innerHTML = codeInternalRef.current;
	};
	const syncCodeInternal = () => {
		const inputEl = inputRef.current;
		if (!inputEl) return;

		const currentInternalCode = codeInternalRef.current;
		const newInternalCode = convertToInternalCode(code);

		if (newInternalCode !== currentInternalCode) {
			console.info('CodeEditor: Setting initial internal code.');
			codeInternalRef.current = newInternalCode;
			inputEl.innerHTML = newInternalCode;
		}
	};

	const syncCodeExternal = useCallback(
		(code: Code) => {
			codeInternalRef.current = code;
			const codeExternal = convertToExternalCode(code);
			setCode?.(codeExternal);
			setCodeError?.(validateCode(codeExternal, codeLang));
		},
		[setCode, setCodeError]
	);

	useEffect(setInternalHtmlOnce, []);
	useEffect(syncCodeInternal, [code]);

	return (
		<pre
			className={`${lineCls}
				${isWrapEnabled ? 'pl-12' : ''}
				text-transparent/20 caret-black
				focus:outline-none
			`}
			contentEditable={!!setCode}
			onKeyDown={(e) => onKeyDown(e, syncCodeExternal)}
			onPaste={(e) => onPaste(e, syncCodeExternal)}
			ref={inputRef}
			spellCheck={false}
		/>
	);
}

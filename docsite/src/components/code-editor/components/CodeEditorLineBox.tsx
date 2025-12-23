import { useContext, useCallback, useRef } from 'react';
import { CodeEditorContext } from '../CodeEditor';
import { validateCode } from '../utils/codeLanguageUtil';
import { codeToLines, linesToCode } from '../utils/codeEditorUtil';

export type CodeEditorLineBoxProps = {};
export function CodeEditorLineBox({}: CodeEditorLineBoxProps) {
	const { codeLang, lineCls, virtualLinesContentRef, setCode, setCodeError } =
		useContext(CodeEditorContext);

	const commitRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debouncedCommit = useCallback(
		(newCode: string) => {
			if (commitRef.current) {
				clearTimeout(commitRef.current);
			}

			commitRef.current = setTimeout(() => {
				setCode?.(newCode);
				setCodeError?.(validateCode(newCode, codeLang));
			}, 0);
		},
		[setCode, setCodeError, codeLang]
	);

	const onInput = useCallback(
		(e: React.FormEvent<HTMLPreElement>) => {
			if (!setCode) return;

			const newCode = e.currentTarget.innerText ?? '';
			const newLines = codeToLines(newCode);
			console.log('newCode: ', newCode);
			console.log('newLines: ', newLines);
			virtualLinesContentRef.current = newLines;

			debouncedCommit(newCode);
		},
		[setCode, debouncedCommit]
	);

	return (
		<pre
			contentEditable={!!setCode}
			className={`
				${lineCls} text-transparent caret-black focus:outline-none
			`}
			onInput={onInput}
			ref={(pre) => {
				if (!pre) return;

				const code = linesToCode(virtualLinesContentRef.current);
				// Only set once (or on external reset)
				if (pre.textContent !== code) {
					pre.textContent = code;
				}
			}}
			spellCheck={false}
		/>
	);
}

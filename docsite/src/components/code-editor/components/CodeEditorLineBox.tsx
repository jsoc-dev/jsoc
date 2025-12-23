import { useContext, useCallback, useRef } from 'react';
import { CodeEditorContext, type CodeLineNumber } from '../CodeEditor';
import { validateCode } from '../utils/codeLanguageUtil';
import { linesToCode } from '../utils/codeEditorUtil';

export type CodeEditorLineBoxProps = {
	lineNumber: CodeLineNumber;
};
export function CodeEditorLineBox({ lineNumber }: CodeEditorLineBoxProps) {
	const {
		codeLang,
		editable,
		lineCls,
		virtualLinesContentRef,
		setCode,
		setCodeError,
	} = useContext(CodeEditorContext);

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
			if (!editable) return;

			virtualLinesContentRef.current[lineNumber - 1] =
				e.currentTarget.textContent ?? '';

			const newCode = linesToCode(virtualLinesContentRef.current);

			debouncedCommit(newCode);
		},
		[editable, lineNumber, debouncedCommit]
	);

	return (
		<pre
			contentEditable={!!(editable && setCode)}
			className={`
				${lineCls} text-transparent caret-blue-600
			`}
			onInput={onInput}
			ref={(el) => {
				if (!el) return;

				const line = virtualLinesContentRef.current[lineNumber - 1];
				// Only set once (or on external reset)
				if (el.textContent !== line) {
					el.textContent = line;
				}
			}}
			spellCheck={false}
		/>
	);
}

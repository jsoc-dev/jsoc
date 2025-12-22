import { useContext, useCallback } from 'react';
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
		highlightLines,
		isWrapEnabled,
		linesRef,
		setCode,
		setCodeError,
		showLineNumbers,
	} = useContext(CodeEditorContext);
	const wrapCls = isWrapEnabled ? 'whitespace-pre-wrap' : '';
	const bgCls = highlightLines.includes(lineNumber)
		? 'bg-surface-codeHighlight'
		: 'bg-surface-code';

	const onInput = useCallback((e: React.FormEvent<HTMLPreElement>) => {
		if (!editable) return;

		linesRef.current[lineNumber - 1] = e.currentTarget.textContent ?? '';

		const newCode = linesToCode(linesRef.current);
		setCode?.(newCode);
		setCodeError?.(validateCode(newCode, codeLang));
	}, []);

	return (
		<>
			<div className={`${bgCls} flex flex-row`}>
				{/* line numbering */}
				{showLineNumbers && (
					<span
						className={`
                            ${bgCls} 
                            sticky left-0 w-8 
                            min-w-8 
                            pr-2 
                            text-sm text-right text-gray-800 select-none 
                        `}
					>
						{lineNumber}
					</span>
				)}
				{/* line content */}
				<pre
					className={`
                        ${wrapCls} 
                        flex-1 
                        pl-3 pr-4 
                        text-sm text-text-muted
					`}
					contentEditable={editable}
					onInput={onInput}
					ref={(el) => {
						if (!el) return;

						const line = linesRef.current[lineNumber - 1];
						// Only set once (or on external reset)
						if (el.textContent !== line) {
							el.textContent = line;
						}
					}}
					spellCheck={false}
				/>
			</div>
		</>
	);
}

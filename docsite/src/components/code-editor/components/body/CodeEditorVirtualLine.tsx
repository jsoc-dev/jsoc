import { useContext, } from 'react';
import { CodeEditorContext, type CodeLine, type CodeLineNumber  } from '../../CodeEditor';
import { CodeEditorLineNumber } from '../body/CodeEditorLineNumber';

export function CodeEditorVirtualLine(
    {line, lineCls, lineNumber, isTrailingLine}: 
    {line: CodeLine, lineCls: string, lineNumber: CodeLineNumber, isTrailingLine:boolean}

) {
    const {isWrapEnabled, highlightLines, highlightLineCls} = useContext(CodeEditorContext)

	const togglehighlightLineCls = (n: CodeLineNumber) =>
		highlightLines.includes(n) ? highlightLineCls : 'bg-surface-code';

	return (
        <>
			{/* line-number: isWrapEnabled */}
			{isWrapEnabled && (
				<CodeEditorLineNumber
					className='inline-block'
					lineNumber={lineNumber}
					isTrailingLine={isTrailingLine}
				/>
			)}
			{/* virtual-line */}
			<pre
				className={`
                    ${isWrapEnabled ? '' : 'pl-12 h-5'}
                    ${togglehighlightLineCls(lineNumber)}
                    ${lineCls}
                `}
			>
				{isTrailingLine ? '' : line}
			</pre>
		</>
	);
}

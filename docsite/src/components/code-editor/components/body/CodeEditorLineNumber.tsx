import type { CodeLineNumber } from '../../CodeEditor';

export function CodeEditorLineNumber({
	className,
	lineNumber,
	totalLines,
}: {
	className?: string;
	lineNumber: CodeLineNumber;
	totalLines: number;
}) {
	const isTrailing = lineNumber === totalLines;

	return (
		<span
			className={`
				${isTrailing ? 'text-transparent' : 'text-text-muted'}
                w-12 min-w-12 pr-4
                leading-5 text-sm text-right  align-top
                font-mono ${className}
            `}
		>
			{lineNumber}
		</span>
	);
}

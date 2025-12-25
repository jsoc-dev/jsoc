import type { CodeLineNumber } from '../../CodeEditor';

export function CodeEditorLineNumber({
	className,
	lineNumber,
}: {
	className?: string
	lineNumber: CodeLineNumber;
}) {
	return (
		<span
			className={`
                w-12 min-w-12 pr-4
                leading-5 text-sm text-right text-text-muted align-top
                font-mono ${className}
            `}
		>
			{lineNumber}
		</span>
	);
}

import type { CodeLineNumber } from '../../CodeEditor';

export function CodeEditorLineNumber({
	className,
	lineNumber,
	isTrailingLine,
}: {
	className?: string;
	lineNumber: CodeLineNumber;
	isTrailingLine: boolean;
}) {

	return (
		<span
			className={`
				${isTrailingLine ? 'text-transparent' : 'text-text-muted'}
                w-12 min-w-12 pr-4
                leading-5 text-sm text-right  align-top
                font-mono ${className}
            `}
		>
			{lineNumber}
		</span>
	);
}

import type { CodeLineNumber } from '../CodeEditor';

export function CodeEditorLineNumber({
	lineNumber,
}: {
	lineNumber: CodeLineNumber;
}) {
	return (
		<span
			className='
                relative top-0 -left-9
                inline-block min-w-6
                leading-5 text-sm text-right text-gray-800 align-top
                font-mono
            '
		>
			{lineNumber}
		</span>
	);
}

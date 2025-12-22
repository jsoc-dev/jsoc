import { createContext, useRef, useState } from 'react';
import { CodeEditorToolbar } from './components/CodeEditorToolbar';
import { CodeEditorTitlebar } from './components/CodeEditorTitlebar';
import { CodeEditorLineBox } from './components/CodeEditorLineBox';
import { codeToLine } from './utils/codeEditorUtil';

export type Code = string;
export type CodeError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;
export type CodeLines = string[];
export type CodeLineNumber = number;
export type CodeLanguage = 'cmd' | 'json' | 'js' | 'jsx' | 'ts' | 'tsx';

export type isWrapEnabled = boolean;
export type SetisWrapEnabled = React.Dispatch<React.SetStateAction<boolean>>;
export type CodeEditorProps = {
	className?: string;
	code: Code;
	codeError?: CodeError;
	codeLang: CodeLanguage;
	editable?: boolean;
	fileName?: string;
	highlightLines?: CodeLineNumber[];
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
	showLineNumbers?: boolean;
};

// TODO: Use simple text buttons for copy, wrap instead of svgs
// (for inspiration check editor css used in below sites
// https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
// https://developer.mozilla.org/en-US/play
export function CodeEditor({
	className = '',
	code,
	codeLang,
	editable = false,
	fileName = 'Code',
	highlightLines = [],
	setCode,
	setCodeError,
	showLineNumbers = (codeToLine(code).length > 1),
}: CodeEditorProps) {
	const linesRef = useRef(codeToLine(code));
	const [isWrapEnabled, setIsWrapEnabled] = useState(true);

	return (
		<CodeEditorContext.Provider
			value={{
				code,
				codeLang,
				editable,
				fileName,
				highlightLines,
				isWrapEnabled,
				linesRef,
				showLineNumbers,
				setCode,
				setCodeError,
				setIsWrapEnabled,
			}}
		>
			<div
				// flex-1: for forcing grow if consumer wraps CodeEditor in flex container
				// min-h-20: header is h-12 so atleast h-8 for content
				// overflow-hidden: to make sure rounded borders are not overlapped by children
				className={`
					bg-surface-code 
					border border-outline-subtle rounded-xl
					flex-1 flex flex-col
					min-h-20
					overflow-hidden
					${className}
				`}
			>
				{/* header-wrapper */}
				<div
					className='
						border-b border-b-outline-subtle 
						flex justify-between
						h-12 max-h-12 
						p-3 
					'
				>
					<CodeEditorTitlebar />
					<CodeEditorToolbar />
				</div>

				{/* content-wrapper*/}
				<div
					// flex-1: for growing (minimum h-8)
					// overflow-auto: for scrollbars
					className='py-3 overflow-auto flex-1'
				>
					{/* line-box-wrapper */}
					<div className='inline-block min-w-full'>
						{linesRef.current.map((_, index) => (
							<CodeEditorLineBox
								key={index}
								lineNumber={index + 1}
							/>
						))}
					</div>
				</div>
			</div>
		</CodeEditorContext.Provider>
	);
}

export type CodeEditorContext = {
	code: Code;
	codeLang: CodeLanguage;
	editable: boolean;
	fileName: string;
	highlightLines: number[];
	isWrapEnabled: boolean;
	linesRef: React.RefObject<CodeLines>;
	showLineNumbers: boolean;
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CodeEditorContext = createContext<CodeEditorContext>({
	code: '',
	codeLang: 'cmd',
	editable: true,
	fileName: '',
	highlightLines: [],
	isWrapEnabled: true,
	linesRef: { current: [] },
	showLineNumbers: true,
	setCode: () => undefined,
	setCodeError: () => undefined,
	setIsWrapEnabled: () => undefined,
});


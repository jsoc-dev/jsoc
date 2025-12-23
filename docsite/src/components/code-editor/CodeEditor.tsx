import { createContext, Fragment, useRef, useState } from 'react';
import { CodeEditorToolbar } from './components/CodeEditorToolbar';
import { CodeEditorTitlebar } from './components/CodeEditorTitlebar';
import { codeToLine } from './utils/codeEditorUtil';
import { CodeEditorLineNumber } from './components/CodeEditorLineNumber';
import { CodeEditorLineBox } from './components/CodeEditorLineBox';

export type Code = string;
export type CodeError = {
	message: string;
	type?: string;
	position?: number;
	line?: number;
	column?: number;
} | null;
export type CodeLine = string;
export type CodeLineNumber = number;
export type CodeLanguage = 'cmd' | 'json' | 'js' | 'jsx' | 'ts' | 'tsx';
export type CodeEditorProps = {
	className?: string;
	code: Code;
	codeError?: CodeError;
	codeLang: CodeLanguage;
	fileName?: string;
	highlightCls?: string;
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
	fileName = 'Code',
	highlightCls = 'bg-surface-codeHighlight',
	highlightLines = [],
	setCode,
	setCodeError,
	showLineNumbers = codeToLine(code).length > 1,
}: CodeEditorProps) {
	const virtualLinesContentRef = useRef(codeToLine(code));
	const [isWrapEnabled, setIsWrapEnabled] = useState(true);

	const linesWrapperCls = `
		${isWrapEnabled ? 'min-w-full' : 'min-w-max'}
		${showLineNumbers ? 'pl-14' : 'pl-3'}
	`;

	const togglehighlightCls = (n: CodeLineNumber) =>
		highlightLines.includes(n) ? highlightCls : '';

	const virtualLineCls = showLineNumbers ? '-left-6' : '';

	const lineCls = `
		flex-1
		leading-5 text-sm text-text-muted
		${isWrapEnabled ? 'whitespace-pre-wrap' : ''}
	`;

	return (
		<CodeEditorContext.Provider
			value={{
				code,
				codeLang,
				fileName,
				highlightLines,
				isWrapEnabled,
				lineCls,
				virtualLinesContentRef,
				showLineNumbers,
				setCode,
				setCodeError,
				setIsWrapEnabled,
			}}
		>
			<div
				// flex-1: for forcing grow if consumer wraps CodeEditor in flex container
				// don-t add min-h as it can be extra if there is only one line of code
				// overflow-hidden: to make sure rounded borders are not overlapped by children
				className={`
					bg-surface-code 
					border border-outline-subtle rounded-xl
					flex-1 flex flex-col
					overflow-hidden ${className}
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

				<div className='flex flex-1 py-3 overflow-auto relative'>
					{/* syntax-highlight-layer */}
					<div
						aria-hidden
						className={`
							absolute
							flex flex-col w-full
							pointer-events-none
							select-none
							z-0
							${isWrapEnabled ? '' : 'min-w-max'}
						`}
					>
						{virtualLinesContentRef.current.map((line, index) => (
							// virtual-lines-wrapper
							<div
								key={index}
								className={`
									inline-flex ${togglehighlightCls(index + 1)}
									${linesWrapperCls} 
								`}
							>
								{/* line-number */}
								{showLineNumbers && (
									<CodeEditorLineNumber
										lineNumber={index + 1}
									/>
								)}
								{/* virtual-line */}
								<pre
									className={`
										relative min-w-full 
										${virtualLineCls}
										${lineCls}
									`}
								>
									{line}
								</pre>
							</div>
						))}
					</div>

					{/* editable-lines-wrapper */}
					<div
						className={`
							inline-block 
							${linesWrapperCls}
							z-10
						`}
					>
						{virtualLinesContentRef.current.map((_, index) => (
							// editable-line
							<Fragment key={index}>
								<CodeEditorLineBox lineNumber={index + 1} />
							</Fragment>
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
	fileName: string;
	highlightLines: number[];
	isWrapEnabled: boolean;
	lineCls: string;
	virtualLinesContentRef: React.RefObject<CodeLine[]>;
	showLineNumbers: boolean;
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CodeEditorContext = createContext<CodeEditorContext>({
	code: '',
	codeLang: 'cmd',
	fileName: '',
	highlightLines: [],
	isWrapEnabled: true,
	lineCls: '',
	virtualLinesContentRef: { current: [] },
	showLineNumbers: true,
	setCode: () => undefined,
	setCodeError: () => undefined,
	setIsWrapEnabled: () => undefined,
});

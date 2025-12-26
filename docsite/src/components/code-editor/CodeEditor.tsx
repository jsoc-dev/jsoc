import { createContext, useRef, useState } from 'react';
import { createVirtualLines } from './utils/virtualLinesUtil';
import { CodeEditorHeader } from './components/CodeEditorHeader';
import { CodeEditorBody } from './components/CodeEditorBody';

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
	highlightLineCls?: string;
	highlightLines?: CodeLineNumber[];
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
};

export function CodeEditor({
	className = '',
	code,
	codeLang,
	fileName = 'Code',
	highlightLines = [],
	highlightLineCls = 'bg-surface-codeHighlight',
	setCode,
	setCodeError,
}: CodeEditorProps) {
	const virtualLinesContentRef = useRef(createVirtualLines(code));
	const [isWrapEnabled, setIsWrapEnabled] = useState(true);

	return (
		<CodeEditorContext.Provider
			value={{
				code,
				codeLang,
				fileName,
				highlightLines,
				highlightLineCls,
				isWrapEnabled,
				virtualLinesContentRef,
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
				<CodeEditorHeader />
				<CodeEditorBody />
			</div>
		</CodeEditorContext.Provider>
	);
}

export type CodeEditorContext = {
	code: Code;
	codeLang: CodeLanguage;
	fileName: string;
	highlightLines: number[];
	highlightLineCls: string;
	isWrapEnabled: boolean;
	virtualLinesContentRef: React.RefObject<CodeLine[]>;
	setCode?: React.Dispatch<React.SetStateAction<Code>>;
	setCodeError?: React.Dispatch<React.SetStateAction<CodeError>>;
	setIsWrapEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CodeEditorContext = createContext<CodeEditorContext>({
	code: '',
	codeLang: 'cmd',
	fileName: '',
	highlightLines: [],
	highlightLineCls: '',
	isWrapEnabled: true,
	setCode: () => undefined,
	setCodeError: () => undefined,
	setIsWrapEnabled: () => undefined,
	virtualLinesContentRef: { current: [] },
});

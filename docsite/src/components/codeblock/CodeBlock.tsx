import { useState } from 'react';
import { CodeActionButtonContainer } from './components/CodeActionButtonContainer';

export type Language = 'cmd' | 'js' | 'jsx' | 'ts' | 'tsx';

export type Code = string;
export type isWrapEnabled = boolean;
export type SetisWrapEnabled = React.Dispatch<React.SetStateAction<boolean>>;
export type CodeBlockProps = {
	fileName?: string;
	lang: Language;
	children: Code;
	highlightLines?: number[];
};

// TODO: Add wrap toggle button
export function CodeBlock({
	fileName,
	lang,
	children,
	highlightLines = [],
}: CodeBlockProps) {
	const lines = children.trim().split('\n');
	const showLineNum = lines.length > 1;
	const [isWrapEnabled, setIsWrapEnabled] = useState(true);

	return (
		<>
			<div className='bg-surface-code border border-outline-subtle rounded-xl overflow-hidden'>
				{/* header */}
				<div className='p-3 border-b border-b-outline-subtle h-12 max-h-12  flex justify-between'>
					<CodeMeta fileName={fileName} lang={lang} />
					<CodeActionButtonContainer
						code={children}
						isWrapEnabled={isWrapEnabled}
						setIsWrapEnabled={setIsWrapEnabled}
					/>
				</div>
				{/* content */}

				<div className='py-3 overflow-auto'>
					<div className='inline-block '>
						{lines.map((line, index) => (
							<LineBox
								key={index}
								lineNumber={index + 1}
								content={line}
								showLineNum={showLineNum}
								doHighlight={highlightLines.includes(index + 1)}
								doWrap={isWrapEnabled}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

function CodeMeta({ fileName, lang }: { fileName?: string; lang: Language }) {
	const LANGUAGE_TEXT: Record<Language, string> = {
		cmd: 'Terminal',
		js: 'JavaScript',
		ts: 'TypeScript',
		tsx: 'TypeScript XML',
		jsx: 'JavaScript XML',
	};

	return (
		<span className='text-gray-400'>
			{fileName ? fileName + '.' + lang : LANGUAGE_TEXT[lang]}{' '}
		</span>
	);
}



export type LineBoxProps = {
	lineNumber: number;
	content: string;
	showLineNum: boolean;
	doHighlight: boolean;
	doWrap: boolean;
};
function LineBox({
	lineNumber,
	content,
	showLineNum,
	doHighlight,
	doWrap,
}: LineBoxProps) {
	const wrapCls = doWrap ? 'whitespace-pre-wrap' : '';
	const bgCls = doHighlight ? 'bg-surface-codeHighlight' : 'bg-surface-code';

	return (
		<>
			<div className={`${bgCls}  flex flex-row`}>
				{/* line numbering */}
				{showLineNum && (
					<pre
						className={`${bgCls} sticky left-0 w-8 min-w-8 pr-2 font-code text-sm text-right text-gray-400 select-none `}
					>
						{lineNumber}
					</pre>
				)}
				{/* line content */}
				<pre className={`${wrapCls} pl-3 text-sm `}>{content}</pre>
			</div>
		</>
	);
}

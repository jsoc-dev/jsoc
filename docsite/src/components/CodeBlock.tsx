import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

export type Language = 'cmd' | 'js' | 'jsx' | 'ts' | 'tsx';

type CodeBlockProps = {
	fileName?: string;
	lang: Language;
	children: string;
	highlightLines?: number[];
};

export function CodeBlock({
	fileName,
	lang,
	children,
	highlightLines = [],
}: CodeBlockProps) {
	const lines = children.trim().split('\n');
	const showLineNum = lines.length > 1;

	return (
		<>
			<div className='bg-surface-code border border-outline-subtle rounded-xl overflow-hidden'>
				{/* header */}
				<div className='border-b border-b-outline-subtle p-3 flex justify-between'>
					<CodeMeta fileName={fileName} lang={lang} />
					<CopyCode code={children} />
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

function CopyCode({ code }: { code: string }) {
	const [showCopyButton, setShowCopyButton] = useState(true);

	return showCopyButton ? (
		<button onClick={copy} title='Copy code' aria-label='Copy code'>
			<CopyIcon />
		</button>
	) : (
		<CheckMarkIcon />
	);

	async function copy() {
		await copyToClipboard(code);
		setShowCopyButton(false);
		setTimeout(() => {
			setShowCopyButton(true);
		}, 2000);
	}
}

type LineBoxProps = {
	lineNumber: number;
	content: string;
	showLineNum?: boolean;
	doHighlight?: boolean;
	doWrap?: boolean;
};
function LineBox({
	lineNumber,
	content,
	showLineNum = false,
	doHighlight = false,
	doWrap = false,
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

function CopyIcon() {
	return (
		<svg
			className='text-gray-400'
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<rect x='6.5' y='6.5' width='12' height='12' rx='3' ry='3' />
			<path d='M4 15.8c-.6-.4-1-1-1-1.8V5a2 2 0 0 1 2-2h9c.9 0 1.4.4 1.8 1' />
		</svg>
	);
}

function CheckMarkIcon() {
	return (
		<span title='Code copied' aria-label='Code Copied'>
			<svg
				className='text-gray-400'
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<circle cx='12' cy='12' r='9' />
				<polyline points='8.5 12.5 11 15 16 9' />
			</svg>
		</span>
	);
}

import { useState } from 'react';

export type Language = 'cmd' | 'js' | 'jsx' | 'ts' | 'tsx';

type CodeBlockProps = {
	title?: string;
	lang: Language;
	children: string;
	highlightLines?: number[];
};

export function CodeBlock({
	title,
	lang,
	children,
	highlightLines = [],
}: CodeBlockProps) {
	const lines = children.trim().split('\n');
	const showLineNum = lines.length > 1;

	return (
		<>
			<div className='rounded-xl bg-code border border-slate-200 overflow-hidden'>
				{/* header */}
				<div className='p-3 flex justify-between border-b border-b-slate-200'>
					<CodeMeta title={title} lang={lang} />
					<CopyCode code={children} />
				</div>
				{/* content */}

				<div className='py-3 font-code overflow-auto'>
					{lines.map((line, index) => (
						<LineBox
							key={index}
							lineNumber={index+1}
							content={line}
							showLineNum={showLineNum}
							highlightLines={highlightLines}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function CodeMeta({ title, lang }: { title?: string; lang: Language }) {
	const LANGUAGE_TEXT: Record<Language, string> = {
		cmd: 'Terminal',
		js: 'JavaScript',
		ts: 'TypeScript',
		tsx: 'TypeScript XML',
		jsx: 'JavaScript XML',
	};

	return (
		<span className='text-gray-400'>
			{title ? title + '.' + lang : LANGUAGE_TEXT[lang]}{' '}
		</span>
	);
}

function CopyCode({ code }: { code: string }) {
	const [showCopyButton, setShowCopyButton] = useState(true);

	return showCopyButton ? (
		<button onClick={copy} title='Copy code'>
			<CopyIcon />
		</button>
	) : (
		<CheckMarkIcon />
	);

	async function copy() {
		await navigator.clipboard.writeText(code);
		setShowCopyButton(false);
		setTimeout(() => {
			setShowCopyButton(true);
		}, 2000);
	}
}

function LineBox({
	lineNumber,
	content,
	showLineNum,
	highlightLines,
}: {
	lineNumber: number;
	content: string;
	showLineNum: boolean;
	highlightLines: number[];
}) {
	const lineWrapperStyle = function (lineNum: number) {
		if (highlightLines.includes(lineNum)) {
			return ' border-gray-400 border-l-4 bg-gray-200';
		} else {
			return ' border-transparent border-l-4';
		}
	};

	return (
		<div
			className={
				'pl-3 flex flex-row space-x-5' + lineWrapperStyle(lineNumber)
			}
		>
			{/* line numbering */}
			{showLineNum && (
				<pre className='w-6 select-none text-right text-gray-400'>
					{lineNumber}
				</pre>
			)}
			{/* line content */}
			<pre className=''>{content}</pre>
		</div>
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
		<span title='Code copied'>
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

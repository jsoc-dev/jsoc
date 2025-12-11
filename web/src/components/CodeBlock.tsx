import { useEffectEvent, useState } from 'react';

type Language = 'cmd' | 'tsx' | 'jsx';

const LANGUAGE_TEXT: Record<Language, string> = {
	cmd: 'Terminal',
	tsx: 'TypeScript',
	jsx: 'JavaScript',
};

export function CodeBlock({
	language,
	children,
}: {
	language: Language;
	children: string;
}) {
	return (
		<>
			<div className='p-3 rounded-md bg-gray-100  text-slate-600'>
				<div className='mb-3 flex justify-between border-b border-b-slate-200'>
					<span>{LANGUAGE_TEXT[language]}</span>
					<CopyCode code={children} />
				</div>

				<pre className='whitespace-pre-wrap'>{children}</pre>
			</div>
		</>
	);
}

function CopyCode({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);
	const revertCopy = useEffectEvent(() => {
		if (copied === true) {
			setCopied(false);
		}
	});

	return copied ? <CopiedCodeIcon /> : <CopyCodeButton copyFn={copy} />;

	async function copy() {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(revertCopy, 2000);
	}
}

function CopiedCodeIcon() {
	return (
		<>
			<span title='Code copied'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<circle cx='12' cy='12' r='9' />
					<polyline points='8.5 12.5 11 15 16 9' />
				</svg>
			</span>
		</>
	);
}

function CopyCodeButton({ copyFn }: { copyFn: Function }) {
	return (
		<>
			<button onClick={() => copyFn()} title='Copy code'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<rect
						x='6.5'
						y='6.5'
						width='12'
						height='12'
						rx='3'
						ry='3'
					/>
					<path d='M4 15.8c-.6-.4-1-1-1-1.8V5a2 2 0 0 1 2-2h9c.9 0 1.4.4 1.8 1' />
				</svg>
			</button>
		</>
	);
}

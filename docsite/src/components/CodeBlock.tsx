import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/clipboard';
import { WrapOn } from './svg/WrapOn';
import { WrapOff } from './svg/WrapOff';
import { ClipboardSvg } from './svg/ClipboardSvg';

export type Language = 'cmd' | 'js' | 'jsx' | 'ts' | 'tsx';

type Code = string;
type CodeBlockProps = {
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
	const [isWrapEnabled, setIsWrapEnabled] = useState(false);

	return (
		<>
			<div className='bg-surface-code border border-outline-subtle rounded-xl overflow-hidden'>
				{/* header */}
				<div className='p-3 border-b border-b-outline-subtle max-h-12  flex justify-between'>
					<CodeMeta fileName={fileName} lang={lang} />
					<CodeActions
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

type isWrapEnabled = boolean;
type SetisWrapEnabled = React.Dispatch<React.SetStateAction<boolean>>;
type CodeActionsProps = {
	code: Code;
	isWrapEnabled: isWrapEnabled;
	setIsWrapEnabled: SetisWrapEnabled;
};

function CodeActions({
	code,
	isWrapEnabled,
	setIsWrapEnabled,
}: CodeActionsProps) {
	return (
		<div className='flex gap-4'>
			<WrapCodeAction
				isWrapEnabled={isWrapEnabled}
				setIsWrapEnabled={setIsWrapEnabled}
			/>
			<CopyCodeAction code={code} />
		</div>
	);
}

const codeActionSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 20,
	width: 20,
};

function WrapCodeAction({
	isWrapEnabled,
	setIsWrapEnabled,
}: {
	isWrapEnabled: isWrapEnabled;
	setIsWrapEnabled: SetisWrapEnabled;
}) {
	const readerText = !isWrapEnabled ? 'Wrap code' : 'Unwrap code';
	const Svg = !isWrapEnabled ? WrapOn : WrapOff;

	return (
		<button
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
			aria-label={readerText}
		>
			<Svg {...codeActionSvgProps} />
		</button>
	);
}

function CopyCodeAction({ code }: { code: Code }) {
	const [isCopied, setIsCopied] = useState(false);
	const readerText = 'Copy code to clipboard';
	const hoverText = isCopied ? 'Code copied' : 'Copy code';

	const copyCode = useCallback(async () => {
		await copyToClipboard(code);
		setIsCopied(true);

		const timeout = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => clearTimeout(timeout);
	}, [code, isCopied]);

	return (
		<>
			<button
				type='button'
				disabled={isCopied}
				aria-label={readerText}
				onClick={copyCode}
				title={hoverText}
			>
				<ClipboardSvg checked={isCopied} />
			</button>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

type LineBoxProps = {
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

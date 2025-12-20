import { useState, useCallback } from 'react';
import type { Code, isWrapEnabled, SetisWrapEnabled } from '../CodeBlock';
import { WrapTextSvg } from '../../svg/WrapTextSvg';
import { copyToClipboard } from '../../../utils/clipboard';
import { ClipboardSvg } from '../../svg/ClipboardSvg';

type CodeActionButtonContainerProps = {
	code: Code;
	isWrapEnabled: isWrapEnabled;
	setIsWrapEnabled: SetisWrapEnabled;
};

export function CodeActionButtonContainer({
	code,
	isWrapEnabled,
	setIsWrapEnabled,
}: CodeActionButtonContainerProps) {
	return (
		<div className='flex h-full items-center gap-4'>
			<WrapCodeAction
				isWrapEnabled={isWrapEnabled}
				setIsWrapEnabled={setIsWrapEnabled}
			/>
			<CopyCodeAction code={code} />
		</div>
	);
}

export type CodeActionButtonProps =
	React.ComponentProps<'button'>;

export function CodeActionButton({
	...props
}: CodeActionButtonProps) {
	return (
		<button
			className={`rounded-md flex items-center justify-center hover:bg-surface-muted`}
			{...props}
		/>
	);
}

const codeActionSvgProps: React.SVGProps<SVGSVGElement> = {
	height: 16,
	width: 16,
};

function WrapCodeAction({
	isWrapEnabled,
	setIsWrapEnabled,
}: {
	isWrapEnabled: isWrapEnabled;
	setIsWrapEnabled: SetisWrapEnabled;
}) {
	const readerText = isWrapEnabled ? 'Disable Code Wrap' : 'Enable Code Wrap';

	return (
		<CodeActionButton
			aria-label={readerText}
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
		>
			<WrapTextSvg {...codeActionSvgProps} disabled={!isWrapEnabled} disabledPathStyle='slashed' />
		</CodeActionButton>
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
			<CodeActionButton
				aria-label={readerText}
				disabled={isCopied}
				onClick={copyCode}
				title={hoverText}
				type='button'
			>
				<ClipboardSvg checked={isCopied} {...codeActionSvgProps} />
			</CodeActionButton>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

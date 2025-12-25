import { useContext, useState, useCallback } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { ClipboardSvg } from '../../../svg/ClipboardSvg';
import { copyToClipboard } from '../../../../utils/clipboard';
import {
	CodeEditorActionButton,
	CodeEditorActionButtonDefaultSvgProps,
} from './CodeEditorActionButton';

export function CodeEditorCopyAction() {
	const { code } = useContext(CodeEditorContext);

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
			<CodeEditorActionButton
				aria-label={readerText}
				disabled={isCopied}
				onClick={copyCode}
				title={hoverText}
				type='button'
			>
				<ClipboardSvg
					checked={isCopied}
					{...CodeEditorActionButtonDefaultSvgProps}
				/>
			</CodeEditorActionButton>

			<span role='status' aria-live='polite' className='sr-only'>
				{!isCopied ? readerText : ''}
			</span>
		</>
	);
}

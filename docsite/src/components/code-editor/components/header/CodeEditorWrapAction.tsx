import { useContext } from 'react';
import { CodeEditorContext } from '../../CodeEditor';
import { WrapTextSvg } from "../../../svg/WrapTextSvg";
import { CodeEditorActionButton, CodeEditorActionButtonDefaultSvgProps } from './CodeEditorActionButton';

export function CodeEditorWrapAction() {
	const { isWrapEnabled, setIsWrapEnabled } = useContext(CodeEditorContext);

	const readerText = isWrapEnabled ? 'Disable Code Wrap' : 'Enable Code Wrap';

	return (
		<CodeEditorActionButton
			aria-label={readerText}
			onClick={() => setIsWrapEnabled((isWrapEnabled) => !isWrapEnabled)}
			title={readerText}
		>
			<WrapTextSvg
				{...CodeEditorActionButtonDefaultSvgProps}
				disabled={!isWrapEnabled}
				disabledPathStyle='slashed'
			/>
		</CodeEditorActionButton>
	);
}

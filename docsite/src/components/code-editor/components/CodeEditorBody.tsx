import { useContext, useEffect, useState } from 'react';
import { CodeEditorContext } from '../CodeEditor';
import { CodeEditorLineNumber } from './body/CodeEditorLineNumber';
import { CodeEditorInput } from './body/CodeEditorInput';
import { convertToVirtualLines } from '../utils/virtualLinesUtil';
import { CodeEditorVirtualLine } from './body/CodeEditorVirtualLine';

export function CodeEditorBody() {
	const { code, codeInternalRef, isWrapEnabled } =
		useContext(CodeEditorContext);

	const [virtualLines, setVirtualLines] = useState(
		convertToVirtualLines(codeInternalRef.current)
	);

	const lineCls = `
		flex-1
		leading-5 text-sm
		${isWrapEnabled ? 'whitespace-pre-wrap wrap-anywhere' : 'min-w-full'}
	`;
	const linesWrapperCls = `${isWrapEnabled ? '' : 'min-w-max'}`;

	useEffect(() => {
		// can use codeInternalRef as it is already updated in CodeEditorInput effect (child effects run first).
		const newVirtualLines = convertToVirtualLines(codeInternalRef.current);
		setVirtualLines(newVirtualLines);
	}, [code]);

	return (
		/* scroller */
		<div className={`flex flex-1 py-3 overflow-auto relative`}>
			{/* line-numbers: !isWrapEnabled */}
			{!isWrapEnabled && (
				<div
					aria-hidden
					className={`
                        flex flex-col
                        sticky left-0 
                        z-20 
                    `}
				>
					{virtualLines.map((_, index) => (
						<CodeEditorLineNumber
							key={index}
							className='bg-surface-code  select-none'
							lineNumber={index + 1}
							isTrailingLine={index + 1 === virtualLines.length}
						/>
					))}
				</div>
			)}

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
				{virtualLines.map((line, index) => (
					<div
						key={index}
						className={`
							inline-flex
							${linesWrapperCls} 
						`}
					>
						<CodeEditorVirtualLine
							line={line}
							lineCls={lineCls}
							lineNumber={index + 1}
							isTrailingLine={index + 1 == virtualLines.length}
						/>
					</div>
				))}
			</div>

			{/* editable-lines-wrapper */}
			<div
				className={`
					inline-block 
					flex-1
					z-10 ${linesWrapperCls}
				`}
			>
				<CodeEditorInput lineCls={lineCls} />
			</div>
		</div>
	);
}

import { useContext } from 'react';
import { CodeEditorContext, type CodeLineNumber } from '../CodeEditor';
import { CodeEditorLineNumber } from './body/CodeEditorLineNumber';
import { CodeEditorInput } from './body/CodeEditorInput';

export function CodeEditorBody() {
	const {
		isWrapEnabled,
		highlightLines,
		highlightLineCls,
		virtualLinesContentRef,
	} = useContext(CodeEditorContext);

	const virtualLines = virtualLinesContentRef.current;

	const lineCls = `
		flex-1
		leading-5 text-sm
		${isWrapEnabled ? 'whitespace-pre-wrap wrap-anywhere' : 'min-w-full'}
	`;
	const linesWrapperCls = `${isWrapEnabled ? '' : 'min-w-max'}`;
	const togglehighlightLineCls = (n: CodeLineNumber) =>
		highlightLines.includes(n) ? highlightLineCls : 'bg-surface-code';

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
							totalLines={virtualLines.length}
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
					// virtual-lines-wrapper
					<div
						key={index}
						className={`
							inline-flex
							${linesWrapperCls} 
						`}
					>
						{/* line-number: isWrapEnabled */}
						{isWrapEnabled && (
							<CodeEditorLineNumber
								className='inline-block'
								lineNumber={index + 1}
								totalLines={virtualLines.length}
							/>
						)}
						{/* virtual-line */}
						<pre
							className={`
								${isWrapEnabled ? '' : 'pl-12 h-5'}
								${togglehighlightLineCls(index + 1)}
								${lineCls}
								${virtualLines.length === index + 1 ? 'text-transparent' : ''}
							`}
						>
							{line}
						</pre>
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
				<CodeEditorInput className={lineCls} />
			</div>
		</div>
	);
}

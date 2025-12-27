import { useState } from 'react';
import { isBoolean, toBoolIcon } from '@jsoc/core/utils';
import { Section } from '../../../components/Section';
import { CodeEditorTestExampleOutput } from './CodeEditorTestExampleOutput';
import type { CodeEditorTestExample } from './utils/codeEditorSampleExamples';

export function CodeEditorTestExampleSection({
	example,
	index,
}: {
	example: CodeEditorTestExample;
	index: number;
}) {
	const [showExamples, setShowExamples] = useState(true);
	const [showOutput, setShowOutput] = useState(false);
	const {
		code = '',
		highlightLines,
		parentHeightCls = '',
	} = example;
	const sectionId = `u${index + 1}`;
	const sectionTitle = `Usage #${index + 1}`;

	return (
		<Section key={index} id={sectionId} title={sectionTitle}>
			<div className='bg-surface-muted border border-outline-subtle flex flex-col p-4 mb-10 gap-4'>
				{/* checkboxes to toggle visibility */}
				<div className='flex justify-between'>
					<label className='flex items-center gap-2 cursor-pointer'>
						<input
							type='checkbox'
							checked={showExamples}
							onChange={(e) => setShowExamples(e.target.checked)}
							className='cursor-pointer'
						/>
						<span className='font-medium'>Show example data</span>
					</label>
					<label className='flex items-center gap-2 cursor-pointer'>
						<input
							type='checkbox'
							checked={showOutput}
							onChange={(e) => setShowOutput(e.target.checked)}
							className='cursor-pointer'
						/>
						<span className='font-medium'>Show output</span>
					</label>
				</div>

				{/* example data */}
				{showExamples && (
					<div className='flex flex-col gap-1'>
						{Object.entries(example).map(([key, value], index) => (
							<div key={index} className='flex gap-2'>
								<span className='font-semibold'>{key}:</span>
								{key == 'code' ? (
									<pre className='overflow-auto max-h-20 font-semibold text-text-primary'>
										{formatValue(value)}
									</pre>
								) : (
									<span className='overflow-auto max-h-20 font-semibold text-text-primary'>
										{formatValue(value)}
									</span>
								)}
							</div>
						))}
					</div>
				)}

				{/* editor */}
				{showOutput && (
					<div className={`flex ${parentHeightCls}`}>
						<CodeEditorTestExampleOutput
							exampleCode={code}
							highlightLines={highlightLines}
						/>
					</div>
				)}
			</div>
		</Section>
	);
}

function formatValue(value: unknown): string {
	return Array.isArray(value)
		? '[ ' + value.join(', ') + ' ]'
		: isBoolean(value)
		? toBoolIcon(value)
		: String(value);
}

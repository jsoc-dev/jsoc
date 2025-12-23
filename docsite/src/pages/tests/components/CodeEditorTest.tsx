import { isBoolean, toBoolIcon } from '@jsoc/core/utils';
import { CodeEditor } from '../../../components/code-editor/CodeEditor';
import { getSampleLines } from '../../../utils/lorem';
import { Section } from '../../../components/Section';
import { useState } from 'react';
import type {
	Code,
	CodeLineNumber,
} from '../../../components/code-editor/CodeEditor';

type LineSize = 'small' | 'large' | 'combo';
const LINE_SIZES: Record<LineSize, { min: number; max: number }> = {
	small: {
		min: 3,
		max: 6,
	},
	large: {
		min: 30,
		max: 40,
	},
	combo: {
		min: 1,
		max: 50,
	},
};

type Example = {
	code?: string;
	lineCount: number;
	lineSize: LineSize;
	editable?: boolean;
	highlightLines: number[];
	fixedParentHeight: boolean;
};
const EXAMPLES_META: Example[] = [
	{
		lineCount: 1,
		lineSize: 'small',
		highlightLines: [1],
		fixedParentHeight: false,
	},
	{
		lineCount: 2,
		lineSize: 'large',
		editable: true,
		highlightLines: [1],
		fixedParentHeight: false,
	},
	{
		lineCount: 5,
		lineSize: 'combo',
		editable: true,
		highlightLines: [1, 3],
		fixedParentHeight: true,
	},
	{
		lineCount: 10,
		lineSize: 'combo',
		editable: true,
		highlightLines: [2, 6],
		fixedParentHeight: false,
	},
	{
		lineCount: 100,
		lineSize: 'combo',
		editable: true,
		highlightLines: [1, 30, 100],
		fixedParentHeight: false,
	},
];

for (const example of EXAMPLES_META) {
	const { min, max } = LINE_SIZES[example.lineSize];

	example.code = getSampleLines(example.lineCount, min, max);
}

export function CodeEditorTest() {
	return EXAMPLES_META.map((example, index) => {
		const {
			code = '',
			editable,
			highlightLines,
			fixedParentHeight,
		} = example;
		const parentHeightCls = fixedParentHeight ? `h-[200px]` : '';

		const sectionId = `u${index + 1}`;
		const sectionTitle = `Usage #${index + 1}`;

		return (
			<Section key={index} id={sectionId} title={sectionTitle}>
				<div className='bg-surface-muted border border-outline-subtle flex flex-col p-4 mb-10 gap-4'>
					{/* example data */}
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

					{/* editor */}
					<div className={`flex ${parentHeightCls}`}>
						<ExampleRenderer
							editable={editable}
							exampleCode={code}
							highlightLines={highlightLines}
						/>
					</div>
				</div>
			</Section>
		);
	});
}

function ExampleRenderer({
	exampleCode,
	editable,

	highlightLines,
}: {
	exampleCode: Code;
	editable?: boolean;

	highlightLines: CodeLineNumber[];
}) {
	const [code, setCode] = useState(exampleCode);

	return (
		<CodeEditor
			code={code}
			{...(editable && {
				setCode: setCode,
			})}
			codeLang='cmd'
			highlightLines={highlightLines}
		/>
	);
}

function formatValue(value: unknown): string {
	return Array.isArray(value)
		? '[ ' + value.join(', ') + ' ]'
		: isBoolean(value)
		? toBoolIcon(value)
		: String(value);
}

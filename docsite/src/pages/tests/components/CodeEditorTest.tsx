import { isBoolean, toBoolIcon } from '@jsoc/core/utils';
import { CodeEditor } from '../../../components/code-editor/CodeEditor';
import { getSampleLines } from '../../../utils/lorem';
import { Section } from '../../../components/Section';

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
	lineCount: number;
	lineSize: LineSize;
	editable: boolean;
	highlightLines: number[];
	fixedParentHeight: boolean;
};
const examples: Example[] = [
	{
		lineCount: 1,
		lineSize: 'small',
		editable: false,
		highlightLines: [1],
		fixedParentHeight: false,
	},
	{
		lineCount: 1,
		lineSize: 'large',
		editable: true,
		highlightLines: [1],
		fixedParentHeight: false,
	},
	{
		lineCount: 10,
		lineSize: 'combo',
		editable: true,
		highlightLines: [4, 5],
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

export function CodeEditorTest() {
	return (
		<>
			{examples.map((example, index) => {
				const {
					lineCount,
					lineSize,
					editable,
					highlightLines,
					fixedParentHeight,
				} = example;
				const parentHeightCls = fixedParentHeight ? `h-[300px]` : '';

				const { min, max } = LINE_SIZES[lineSize];
				const code = getSampleLines(lineCount, min, max);

				const sectionId = `u${index + 1}`;
				const sectionTitle = `Usage #${index + 1}`;

				return (
					<Section key={index} id={sectionId} title={sectionTitle}>
						<div
							className={`
								bg-surface-muted border border-outline-subtle flex flex-col p-4 mb-10 gap-4

								${parentHeightCls}
							`}
						>
							{/* example data */}
							<div className='flex flex-col gap-1'>
								{Object.entries(example).map(
									([key, value], index) => (
										<div key={index} className='flex gap-2'>
											<span className='font-semibold'>
												{key}:
											</span>
											<span className='font-semibold text-text-primary'>
												{formatValue(value)}
											</span>
										</div>
									)
								)}
							</div>

							{/* editor */}
							<CodeEditor
								code={code}
								editable={editable}
								codeLang='cmd'
								highlightLines={highlightLines}
							/>
						</div>
					</Section>
				);
			})}
		</>
	);
}

function formatValue(value: unknown): string {
	return Array.isArray(value)
		? '[ ' + value.join(', ') + ' ]'
		: isBoolean(value)
		? toBoolIcon(value)
		: String(value);
}

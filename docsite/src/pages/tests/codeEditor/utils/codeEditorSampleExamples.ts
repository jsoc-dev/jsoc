import { getSampleLines } from '../../../../utils/lorem';

type LineSize = 'small' | 'large' | 'combo';
const LINE_SIZES: Record<LineSize, { min: number; max: number }> = {
	small: {
		min: 0,
		max: 6,
	},
	large: {
		min: 0,
		max: 40,
	},
	combo: {
		min: 0,
		max: 50,
	},
};

export type CodeEditorTestExample = {
	code?: string;
	lineCount: number;
	lineSize: LineSize;
	highlightLines: number[];
	parentHeightCls?: string;
};

const EXAMPLES_META: CodeEditorTestExample[] = [
	{
		lineCount: 1,
		lineSize: 'small',
		highlightLines: [1],
	},
	{
		lineCount: 2,
		lineSize: 'small',
		highlightLines: [1],
	},
	{
		lineCount: 2,
		lineSize: 'large',
		highlightLines: [1],
	},
	{
		lineCount: 10,
		lineSize: 'combo',
		highlightLines: [1, 3],
		parentHeightCls: 'h-[200px]',
	},
	{
		lineCount: 10,
		lineSize: 'combo',
		highlightLines: [2, 6],
	},
	{
		lineCount: 100,
		lineSize: 'combo',
		highlightLines: [1, 30, 100],
	},
];

for (const example of EXAMPLES_META) {
	const { min, max } = LINE_SIZES[example.lineSize];

	example.code = getSampleLines(example.lineCount, min, max) ;
}

export { EXAMPLES_META };

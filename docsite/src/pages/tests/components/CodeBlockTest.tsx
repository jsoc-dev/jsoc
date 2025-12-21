import { CodeBlock } from '../../../components/codeblock/CodeBlock';
import { Section } from '../../../components/Section';
import { getSampleLines } from '../../../utils/lorem';

export function CodeBlockTest() {
	const wordCounts = {
		small: {
			min: 3,
			max: 6,
		},
		large: {
			min: 30,
			max: 40,
		},
		random: {
			min: 1,
			max: 50,
		},
	};

	return (
		<>
			<Section title='Single Small line'>
				<CodeBlock lang='cmd'>{getSampleLines(1, wordCounts.small.min, wordCounts.small.max)}</CodeBlock>
			</Section>

			<Section title='Single Small highlighted line '>
				<CodeBlock lang='cmd' highlightLines={[1]}>
					{getSampleLines(1, wordCounts.small.min, wordCounts.small.max)}
				</CodeBlock>
			</Section>

			<Section title='Single Large line'>
				<CodeBlock lang='cmd'>{getSampleLines(1, wordCounts.large.min, wordCounts.large.max)}</CodeBlock>
			</Section>

			<Section title='Single Large highlighted line '>
				<CodeBlock lang='cmd' highlightLines={[1]}>
					{getSampleLines(1, wordCounts.large.min, wordCounts.large.max)}
				</CodeBlock>
			</Section>

			<Section title='Ten small lines including highlighted'>
				<CodeBlock lang='cmd' highlightLines={[5]}>
					{getSampleLines(10, wordCounts.small.min, wordCounts.small.max)}
				</CodeBlock>
			</Section>
			<Section title='Ten lines including highlighted'>
				<CodeBlock lang='cmd' highlightLines={[10]}>
					{getSampleLines(10, wordCounts.random.min, wordCounts.random.max)}
				</CodeBlock>
			</Section>

			<Section title='Hundred lines'>
				<CodeBlock lang='cmd'>{getSampleLines(100, wordCounts.random.min, wordCounts.random.max)}</CodeBlock>
			</Section>
		</>
	);
}

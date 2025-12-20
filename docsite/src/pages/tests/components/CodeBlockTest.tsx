import { CodeBlock } from '../../../components/codeblock/CodeBlock';
import { Section } from '../../../components/Section';
import { CodeInline } from '../../../components/CodeInline';
import { getSampleLines } from '../../../utils/lorem';

export function CodeBlockTest() {
	return (
		<>
			<Section
				isHeading
				title={
					<>
						Test <CodeInline>CodeBlock</CodeInline>
					</>
				}
			></Section>

			<Section title='Single line'>
				<CodeBlock lang='cmd'>{getSampleLines(1)}</CodeBlock>
			</Section>

			<Section title='Ten lines including highlighted'>
				<CodeBlock lang='cmd' highlightLines={[3, 6]}>
					{getSampleLines(10)}
				</CodeBlock>
			</Section>

			<Section title='Hundred lines'>
				<CodeBlock lang='cmd'>{getSampleLines(100)}</CodeBlock>
			</Section>
		</>
	);
}

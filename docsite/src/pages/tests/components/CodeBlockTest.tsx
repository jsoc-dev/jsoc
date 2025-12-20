import { range } from '@jsoc/core/utils';
import { CodeBlock } from '../../../components/CodeBlock';
import { Section } from '../../../components/Section';
import { CodeInline } from '../../../components/CodeInline';

const singleLineText =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, ut.';

const multiLineText = range(1, 100)
	.map(
		(_) =>
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia accusamus, reprehenderit, nobis itaque dolorem fugit ipsa vel minima natus enim quis nesciunt. Fugiat, sed? Iure ex quam suscipit est temporibus?'
	)
	.join('\n');

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

			<Section title='Single Line'>
				<CodeBlock lang='cmd'>{singleLineText}</CodeBlock>
			</Section>

			<Section title='Multi Line'>
				<CodeBlock lang='cmd'>{multiLineText}</CodeBlock>
			</Section>
		</>
	);
}

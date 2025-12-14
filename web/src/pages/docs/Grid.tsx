import { CodeBlock } from './components/CodeBlock';
import { Section } from './components/Section';
import { ListItem, NumericList } from './components/List';

const renderExampleCode = `
import { JsocGrid } from '@jsoc/react/grid';

function JsocGridDemo({data, ui}) {
	return (
		<div className='h-80 min-w-full m-1.5'>
			<JsocGrid data={data} ui={ui} />
		</div>
	)
}
`;

export function Grid() {
	return (
		<>
			{/* heading */}
			<Section
				isHeading
				title='{{JsocGrid}}'
				subtitle='This page will guide you through how to use {{JsocGrid}} in your React app.'
			/>

			{/* installation */}
			<Section id='installation' title='Installation'>
				<NumericList>
					<ListItem title='Install the {{@jsoc/react}} package in your project.'>
						<CodeBlock lang='cmd'>
							npm install @jsoc/react
						</CodeBlock>
					</ListItem>
				</NumericList>
			</Section>

			{/* usage */}
			<Section id='usage' title='Usage'>
				<NumericList>
					<ListItem title='Import the component.'>
						<CodeBlock title='JsocGridDemo' lang='tsx'>
							{"import { JsocGrid } from '@jsoc/react/grid'"}
						</CodeBlock>
					</ListItem>

					<ListItem title='Render the component.'>
						<CodeBlock
							title='JsocGridDemo'
							lang='tsx'
							highlightLines={[6]}
						>
							{renderExampleCode}
						</CodeBlock>
					</ListItem>
				</NumericList>
			</Section>

			{/* props */}
			<Section id='props' title='Props'>
				{/* to be fetched from generated docs */}
			</Section>

			{/* adapters */}
			<Section id='adapters' title='Adapters'>
				{/* to be fetched from generated docs */}
			</Section>
		</>
	);
}

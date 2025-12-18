import { CodeBlock } from '../../../../components/CodeBlock';
import { Section } from '../../../../components/Section';
import { ListItem, NumericList } from '../../../../components/List';
import { CodeInline } from '../../../../components/CodeInline';
import { props } from 'docs/generated';
import { JsocGrid } from '@jsoc/react';

const compName = 'JsocGrid';
const pkgName = '@jsoc/react';

const importExample = `import { ${compName} } from '${pkgName}/grid'`;
const renderExample = `${importExample}\n
function JsocGridDemo({data, ui}) {
	return (
		<div className='h-80 min-w-full m-1.5'>
			<${compName} data={data} ui={ui} />
		</div>
	)
}
`;
const propsData = Object.values(props).map((x) => ({
	name: x.name,
	type: x.type?.name,
	description: x.description,
	required: x.required,
	defaultvalue: x.defaultValue?.value
}));

export function GridDoc() {
	const compNameEl = <CodeInline>{compName}</CodeInline>;
	const pkgNameEl = <CodeInline>{pkgName}</CodeInline>;

	return (
		<>
			{/* heading */}
			<Section
				isHeading
				title={compNameEl}
				subtitle={
					<>
						This page will guide you through how to use {compNameEl}{' '}
						in your React app.
					</>
				}
			/>

			{/* installation */}
			<Section id='installation' title='Installation'>
				<NumericList>
					<ListItem
						title={
							<>
								Install the {pkgNameEl} package in your project.
							</>
						}
					>
						<CodeBlock lang='cmd'>
							{'npm install ' + pkgName}
						</CodeBlock>
					</ListItem>
				</NumericList>
			</Section>

			{/* usage */}
			<Section id='usage' title='Usage'>
				<NumericList>
					<ListItem title='Import the component.'>
						<CodeBlock title='JsocGridDemo' lang='tsx'>
							{importExample}
						</CodeBlock>
					</ListItem>

					<ListItem title='Render the component.'>
						<CodeBlock
							title='JsocGridDemo'
							lang='tsx'
							highlightLines={[6]}
						>
							{renderExample}
						</CodeBlock>
					</ListItem>
				</NumericList>
			</Section>

			{/* props */}
			<Section id='props' title='Props'>
				{/* to be fetched from generated docs */}
				<JsocGrid data={propsData} ui='mui' showDefaultNavigator={false} uiProps={{native: {showToolbar: true}}}/>
			</Section>

			{/* adapters */}
			<Section id='adapters' title='Adapters'>
				{/* to be fetched from generated docs */}
			</Section>
		</>
	);
}

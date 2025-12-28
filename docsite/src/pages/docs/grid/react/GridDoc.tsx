import { CodeEditor } from '../../../../../../../code-editor';
import { Section } from '../../../../components/Section';
import { ListItem, NumericList } from '../../../../components/List';
import { CodeInline } from '../../../../components/CodeInline';
import { props } from '@jsoc/docs/generated';
import { JsocGrid } from '@jsoc/react/grid';

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
	required: x.required,
	defaultvalue: x.defaultValue?.value,
	type: x.type?.name,
	description: x.description,
}));

export function GridDoc() {
	const compNameEl = <CodeInline>{compName}</CodeInline>;
	const pkgNameEl = <CodeInline>{pkgName}</CodeInline>;

	return (
		<div className='flex flex-col min-h-full py-pageY'>
			{/* heading */}
			<Section
				isHeading
				title='Grid Documentation'
				subtitle={<>Guide for using {compNameEl} in a React app.</>}
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
						<CodeEditor
							code={'npm install ' + pkgName}
							codeLang='cmd'
						/>
					</ListItem>
				</NumericList>
			</Section>

			{/* usage */}
			<Section id='usage' title='Usage'>
				<NumericList>
					<ListItem title='Import the component.'>
						<CodeEditor
							code={importExample}
							codeLang='tsx'
							fileName='JsocGridDemo'
						/>
					</ListItem>

					<ListItem title='Render the component.'>
						<CodeEditor
							code={renderExample}
							codeLang='tsx'
							fileName='JsocGridDemo'
							highlightLines={[6]}
						/>
					</ListItem>
				</NumericList>
			</Section>

			{/* props */}
			<Section id='props' title='Props'>
				{/* to be fetched from generated docs */}
				<JsocGrid
					data={propsData}
					ui='mui'
					showDefaultNavigator={false}
					uiProps={{ native: { showToolbar: true } }}
				/>
			</Section>

			{/* adapters */}
			<Section id='adapters' title='Adapters'>
				{/* to be fetched from generated docs */}
			</Section>
		</div>
	);
}

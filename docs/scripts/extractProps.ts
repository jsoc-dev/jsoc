import { withCustomConfig } from 'react-docgen-typescript';
import * as fs from 'fs';
import * as path from 'path';

// TODO: Generalise Component,Framework, also declared in web package, should be moved to common source (framework package)
type Component = 'grid';
const COMPONENTS: Component[] = ['grid'];
type Framework = 'react';
const FRAMEWORKS: Framework[] = ['react'];

const [, , component, framework] = process.argv;

assertIsValidComponent(component);
assertIsValidFramework(framework);

function assertIsValidComponent(arg: unknown): asserts arg is Component {
	if (!COMPONENTS.includes(arg as Component)) {
		throwError();
	}
}

function assertIsValidFramework(arg: unknown): asserts arg is Framework {
	if (!FRAMEWORKS.includes(arg as Framework)) {
		throwError();
	}
}

function throwError() {
	throw new Error(
		'Script argument(s) missing.' +
			'\n' +
			'Hint Usage: extract-props <component> <framework>' +
			'\n' +
			'component must be: ' +
			COMPONENTS.join(' or ') +
			'\n' +
			'framework must be: ' +
			FRAMEWORKS.join(' or ')
	);
}

type DocsPathMap = {
	[key in Component]: {
		[key in Framework]: {
			inputPath: string;
			outputPath: string;
		};
	};
};

const DOCS_PATH_MAP: DocsPathMap = {
	grid: {
		react: {
			inputPath: '../packages/react/src/grid/wrapper/JsocGrid.tsx',
			outputPath: './generated/grid/react/props.json',
		},
	},
};

const resolved = DOCS_PATH_MAP[component][framework];

extractProps(resolved.inputPath, resolved.outputPath);

export function extractProps(inputPath: string, outputPath: string) {
	if (!inputPath || !outputPath) {
		console.error('Missing required params');
		return;
	}

	const absSource = path.resolve(inputPath);
	const absOutput = path.resolve(outputPath);

	console.info('Input' + absSource, '\n', 'Output = ' + absOutput, '\n');

	const parser = withCustomConfig('tsconfig.json', {
		savePropValueAsString: true,
	});

	const docs = parser.parse(absSource);

	if (!docs.length) {
		throw new Error(`No components found in ${absSource}`);
	}

	// Ensure output directory exists
	fs.mkdirSync(path.dirname(absOutput), { recursive: true });

	// Write only props (cleaner for docs)
	fs.writeFileSync(absOutput, JSON.stringify(docs[0].props, null, 2));
}

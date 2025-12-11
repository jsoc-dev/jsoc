import { CodeInline } from '../../components/CodeInline';
import { CodeBlock } from '../../components/CodeBlock';
import { Back, PageHeader, Section } from './GetStarted';
import { Link } from 'react-router';

export function GetStartedWithReact() {
	return (
		<>
			<Back />
			<PageHeader
				title='JSOC x React'
				subtitle='This page will guide you through how to use JSOC in your
                                React app.'
			/>

			<Section title='Installation'>
				<p className='mb-4'>
					Install the <CodeInline>@jsoc/react</CodeInline> package in
					your project.
				</p>
				<CodeBlock language='cmd'>npm install @jsoc/react</CodeBlock>
			</Section>

			<Section title='Import Component'>
				<p className='mb-4'>
					Import a <Link className="underline" to='/comps/react'>React Component</Link> in your app. 
				</p>
                <p className='mb-4'>
                    For example:

                </p>
				<CodeBlock language='tsx'>
					{"import { JsocGrid } from '@jsoc/react/grid'"}
				</CodeBlock>
			</Section>
		</>
	);
}

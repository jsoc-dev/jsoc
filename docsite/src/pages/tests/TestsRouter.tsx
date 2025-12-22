import { Section } from '../../components/Section';
import { PageNotFound } from '../../shared/PageNotFound';
import { Link, Route, Routes } from 'react-router';
import { CodeEditorTest } from './components/CodeEditorTest';
import { SplitViewTest } from './components/SplitViewTest';
import { TestComponentPageWrapper } from './TestComponentPageWrapper';

// TODO: Use naming convention : XYZUseCases
const TEST_COMPONENTS = Object.entries({
	CodeEditorTest,
	SplitViewTest,
});

export function TestsRouter() {
	return (
		<Routes>
			<Route index element={<TestsHomePage />} />
			{TEST_COMPONENTS.map(([name, TestComponent]) => (
				<Route
					path={name}
					element={
						<TestComponentPageWrapper
							name={name}
							TestComponent={TestComponent}
						/>
					}
				/>
			))}
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

function TestsHomePage() {
	return (
		<>
			<Section
				isHeading
				title='Test Components'
			>
				<div className='mb-4'>
					NOTE: These are components for testing generic components used in this docsite. These are not shipped in JSOC packages.
				</div>

				<div className='flex gap-4'>
					{TEST_COMPONENTS.map(([name, _], index) => (
						<Link key={index} to={name} className='link-button'>
							{name.replace('Test', '')}
						</Link>
					))}
				</div>
			</Section>
		</>
	);
}

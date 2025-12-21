import { Section } from '../../components/Section';
import { PageNotFound } from '../../shared/PageNotFound';
import { Link, Route, Routes } from 'react-router';
import { CodeBlockTest } from './components/CodeBlockTest';
import { SplitViewTest } from './components/SplitViewTest';
import { TestComponentPageWrapper } from './TestComponentPageWrapper';

const TEST_COMPONENTS = Object.entries({
	CodeBlockTest,
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
				subtitle='Click on the name of component that you want to test:'
			>
				<div className='flex gap-4'>
					{TEST_COMPONENTS.map(([name, _]) => (
						<Link to={name} className='link-button'>
							{name.replace('Test', '')}
						</Link>
					))}
				</div>
			</Section>
		</>
	);
}

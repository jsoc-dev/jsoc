import { PageNotFound } from '../../shared/PageNotFound';
import { Route, Routes } from 'react-router';
import { CodeEditorTest } from './codeEditor/CodeEditorTest';
import { SplitViewTest } from './splitView/SplitViewTest';
import { TestsHomePage } from './TestsHomePage';

// TODO: Use naming convention : XYZUseCases
export const TEST_COMPONENTS = Object.entries({
	CodeEditorTest,
	SplitViewTest,
});

export function TestsRouter() {
	return (
		<Routes>
			<Route index element={<TestsHomePage />} />
			{TEST_COMPONENTS.map(([name, TestComponent]) => (
				<Route path={name} element={<TestComponent />} />
			))}
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

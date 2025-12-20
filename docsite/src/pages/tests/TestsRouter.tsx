import { Section } from '../../components/Section';
import { PageNotFound } from '../../shared/PageNotFound';
import { Link, Route, Routes } from 'react-router';
import { CodeBlockTest } from './components/CodeBlockTest';

export function TestsRouter() {
	return (
		<Routes>
			<Route index element={<Tests />} />
			<Route path='codeblock' element={<CodeBlockTest />} />
			<Route path='*' element={<PageNotFound/>}/>
		</Routes>
	);
}


function Tests() {
	return (
		<>
			<Section isHeading title="Test Components" subtitle="Test Components for testing the UI/UX of components used in this docsite."/>
			
			<Link to='codeblock' className='link-button'>Code Block</Link>
		</>
	)
}

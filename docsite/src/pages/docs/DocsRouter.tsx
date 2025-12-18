import { GridDoc } from './grid/react/GridDoc';
import { PageNotFound } from '../../shared/PageNotFound';
import { Navigate, Route, Routes } from 'react-router';

export function DocsRouter() {
	return (
		<Routes>
			<Route index element={<Docs />} />
			<Route path='grid/react' element={<GridDoc />} />
			<Route path='*' element={<PageNotFound/>}/>
		</Routes>
	);
}

/**
 * Currently not designing Docs as there is only component and one framework
 */
function Docs() {
	return <Navigate to='/docs/grid/react' replace />;
}

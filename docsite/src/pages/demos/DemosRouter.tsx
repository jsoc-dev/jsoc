import { GridDemo } from './grid/react/GridDemo';
import { PageNotFound } from '../../shared/PageNotFound';
import { Navigate, Route, Routes } from 'react-router';

export function DemosRouter() {
	return (
		<Routes>
			<Route index element={<Demos />} />
			<Route path='grid/react' element={<GridDemo />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
	);
}

/**
 * Currently not designing Demos as there is only component and one framework
 */
function Demos() {
	return <Navigate to='/demos/grid/react' replace />;
}

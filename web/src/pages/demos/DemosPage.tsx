import { Route, Routes } from 'react-router';
import { GridDemo } from './grid/react/GridDemo';

export function DemosPage() {
	return (
		<>
			<div className='mt-14'>
				<Routes>
					<Route path='/*' element={<GridDemo />} />
				</Routes>
			</div>
		</>
	);
}

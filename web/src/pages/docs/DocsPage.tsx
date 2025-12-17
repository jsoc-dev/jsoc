import { Route, Routes } from 'react-router';
import { GridDoc } from './grid/react/GridDoc';

export function DocsPage() {
	return (
		<>
			<div className='mt-14'>
				<Routes>
					<Route path='/*' element={<GridDoc />} />
				</Routes>
			</div>
		</>
	);
}

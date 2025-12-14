import { Route, Routes } from 'react-router';
import { Grid } from './Grid';

export function DocsPage() {
	return (
		<>
			<div className='mt-14'>
				<Routes>
					<Route path='/*' element={<Grid />} />
				</Routes>
			</div>
		</>
	);
}

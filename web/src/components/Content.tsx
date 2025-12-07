import { Outlet } from 'react-router';

export function Content() {
	return (
		<>
			<main className='page-width-cap mx-auto flex-1 pt-12'>
				<Outlet />
			</main>
		</>
	);
}

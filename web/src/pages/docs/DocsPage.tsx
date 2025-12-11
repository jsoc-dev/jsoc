import { Route, Routes } from 'react-router';
import { GetStarted } from './GetStarted.tsx';
import { GetStartedWithAngular } from './GetStartedWithAngular.tsx';
import { GetStartedWithReact } from './GetStartedWithReact.tsx';
import { GetStartedWithVue } from './GetStartedWithVue.tsx';

export function DocsPage() {
	return (
		<>
			<div className='mt-14'>
				<Routes>
					<Route index element={<GetStarted />} />
					<Route
						path='jsoc-angular'
						element={<GetStartedWithAngular />}
					/>
					<Route
						path='jsoc-react'
						element={<GetStartedWithReact />}
					/>
					<Route path='jsoc-vue' element={<GetStartedWithVue />} />
				</Routes>
			</div>
		</>
	);
}

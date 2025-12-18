import { Navbar } from './shared/Navbar';
import { HomePage } from './pages/home/HomePage';
import { DocsRouter } from './pages/docs/DocsRouter';
import { DemosRouter } from './pages/demos/DemosRouter';
import { PageNotFound } from './shared/PageNotFound';
import { Route, Routes } from 'react-router';

export default function App() {
	return (
		<AppWrapper>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='demos/*' element={<DemosRouter />} />
				<Route path='docs/*' element={<DocsRouter />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AppWrapper>
	);
}

function AppWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col'>
			<header className='bg-white border-b border-b-outline-subtle h-14 w-full flex justify-center sticky top-0'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					<Navbar />
				</div>
			</header>
			<main className='w-full flex justify-center'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					{children}
				</div>
			</main>
		</div>
	);
}

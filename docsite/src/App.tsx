import { Navbar } from './shared/Navbar';
import { HomePage } from './pages/home/HomePage';
import { DocsRouter } from './pages/docs/DocsRouter';
import { DemosRouter } from './pages/demos/DemosRouter';
import { PageNotFound } from './shared/PageNotFound';
import { Route, Routes } from 'react-router';
import { TestsRouter } from './pages/tests/TestsRouter';
import { isDevMode } from './utils/development';

export default function App() {
	return (
		<AppWrapper>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='demos/*' element={<DemosRouter />} />
				<Route path='docs/*' element={<DocsRouter />} />
				{isDevMode() && (
					<Route path='tests/*' element={<TestsRouter />} />
				)}
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</AppWrapper>
	);
}

function AppWrapper({ children }: { children: React.ReactNode }) {
	return (
		// app-wrapper
		<div className='min-h-screen min-w-60 flex flex-col'>
			{/* app-header */}
			<header className='bg-white border-b border-b-outline-subtle h-14 w-full flex justify-center sticky top-0 z-[9999]'>
				<div className='h-full w-controlled px-controlled'>
					<Navbar />
				</div>
			</header>

			{/* app-main-content */}
			<main className='w-full flex flex-1 justify-center'>
				{/* page-wrapper */}
				<div className='w-controlled px-controlled py-14'>
					{/* page */}
					{children}
				</div>
			</main>
		</div>
	);
}

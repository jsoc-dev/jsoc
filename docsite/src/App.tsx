import { Route, Routes } from 'react-router';
import { Navbar } from './shared/Navbar';
import { HomePage } from './pages/home/HomePage';
import { DocsPage } from './pages/docs/DocsPage';
import { DemosPage } from './pages/demos/DemosPage';

function App() {
	return (
		<div className='flex flex-col'>
			<header className='border-b border-b-outline-subtle h-14 w-full flex justify-center'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					<Navbar />
				</div>
			</header>
			<main className='w-full flex justify-center'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					<Routes>
						<Route path="/*" element={<HomePage />} />
						<Route path='demos/*' element={<DemosPage />} />
						<Route path='docs/*' element={<DocsPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;

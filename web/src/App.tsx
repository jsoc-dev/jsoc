import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/home/HomePage';
import { DocsPage } from './pages/docs/DocsPage';

function App() {
	return (
		<div className='w-svw flex flex-col'>
			<header className='h-14 w-full flex justify-center border-b border-b-slate-200'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					<Navbar />
				</div>
			</header>
			<main className='w-full flex justify-center'>
				<div className='h-full w-full max-w-screen-xl px-6 2xl:px-0'>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path='docs/*' element={<DocsPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}

export default App;

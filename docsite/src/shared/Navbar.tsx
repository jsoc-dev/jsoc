import { CloseSvg } from '../components/svg/CloseSvg';
import { HamburgerSvg } from '../components/svg/HamburgerSvg';
import { JsocSvg } from '../components/svg/JsocSvg';
import { PAGE_MAP, SOCIAL_LIST } from '../utils/contants';
import { useReducer, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export function Navbar() {
	const [isMobileMenuOpen, dispatch] = useReducer(mobileMenuReducer, false);
	const closeMobileMenu = () => dispatch('close');
	const toggleMobileMenu = () => dispatch('toggle');
	const location = useLocation();

	useEffect(() => {
		// in case any button (which is not in navbar) is clicked that changes the path
		closeMobileMenu();
	}, [location.pathname]);

	return (
		<>
			<nav className='h-full flex items-center justify-between'>
				{/* left-items */}
				<div className='flex items-center'>
					{/*  home link */}
					<Link
						className='text-2xl font-semibold inline-flex items-center mr-6'
						to='/'
						aria-label='Home Page'
						onClick={() => closeMobileMenu()}
					>
						<JsocSvg className='h-10 w-10 min-h-10 min-w-10' />
					</Link>

					{/* Menu Items */}
					<div className='hidden navbig:flex navbig:items-center navbig:space-x-2'>
						{/* page links */}
						{Object.entries(PAGE_MAP).map(
							([key, { name, path }]) => (
								<Link
									className='border-transparent rounded-xl h-8 text-lg inline-flex items-center px-3 py-5 text-text-muted hover:bg-surface-muted'
									key={key}
									to={path}
								>
									{name}
								</Link>
							)
						)}
					</div>
				</div>

				{/* right-items */}
				<div className='flex items-center space-x-2'>
					{/* social-links */}
					{SOCIAL_LIST.map(({ link, text, Svg }, index) => (
						<Link
							aria-label={text}
							className=' h-5 text-lg inline-flex items-center px-2 py-4 border border-outline-subtle rounded-xl hover:bg-surface-muted'
							key={index}
							to={link}
							target='_blank'
							rel='noopener noreferrer'
						>
							<Svg className='h-4 w-4 min-h-4 min-w-4 text-text-muted' />
						</Link>
					))}

					{/* hamburger */}
					<button
						onClick={() => toggleMobileMenu()}
						className='ml-3 navbig:hidden rounded'
						aria-label='Toggle menu'
						aria-expanded={isMobileMenuOpen}
					>
						{!isMobileMenuOpen ? <HamburgerSvg /> : <CloseSvg />}
					</button>
				</div>
			</nav>

			{/* mobile menu drawer */}
			{isMobileMenuOpen && (
				<div className='bg-white border-b border-b-outline-subtle h-full w-full flex flex-col items-center fixed left-0 top-14  navbig:hidden'>
					{Object.entries(PAGE_MAP).map(([key, { name, path }]) => (
						<Link
							className='w-full text-center p-3 border-b border-b-outline-subtle hover:bg-surface-muted'
							key={key}
							to={path}
							onClick={() => closeMobileMenu()}
						>
							{name}
						</Link>
					))}
				</div>
			)}
		</>
	);
}

type Action = 'open' | 'close' | 'toggle';
function mobileMenuReducer(state: boolean, action: Action) {
	switch (action) {
		case 'open':
			return true;
		case 'close':
			return false;
		case 'toggle':
			return !state;
	}
}
import jsocLogo from '../assets/jsoc.svg';
import { PAGE_MAP, SOCIAL_LIST } from '../utils/contants';
import { useReducer, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export function Navbar() {
	const [isMobileMenuOpen, dispatch] = useReducer(mobileMenuReducer, false);
	const closeMobileMenu = () => dispatch('close');
	const toggleMobileMenu = () => dispatch('toggle');
	const location = useLocation();

	useEffect(() => {
		closeMobileMenu();
	}, [location.pathname]);

	return (
		<>
			<nav className='h-full flex items-center justify-between'>
				{/* left-items */}
				<div className='flex items-center'>
					{/* logo */}
					<div className='flex items-center mr-8'>
						<Link
							className='text-2xl font-semibold inline-flex items-center'
							to='/'
						>
							<img
								title='JSOC'
								className='h-10 w-10 min-h-8 min-w-8'
								src={jsocLogo}
								alt='JSOC'
							/>
						</Link>
					</div>
					{/* Menu Items */}
					<div className='hidden pt-[3px] md:flex md:items-center md:space-x-5'>
						{Object.entries(PAGE_MAP).map(
							([key, { name, path }]) => (
								<Link
									className='h-8 text-lg inline-flex items-center'
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
				<div className='flex items-center'>
					{/* social-links */}
					<div className='flex items-center space-x-5'>
						{SOCIAL_LIST.map(({ link, text, logo }, index) => (
							<Link
								key={index}
								to={link}
								title={text}
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									className='h-5 w-5 min-h-4 min-w-4'
									src={logo}
									alt={text}
								/>
							</Link>
						))}
					</div>

					<Hamburger
						value={isMobileMenuOpen}
						toggleValue={toggleMobileMenu}
					/>

					{/* mobile menu drawer */}
					{isMobileMenuOpen && (
						<div className='bg-white border-b border-b-outline-subtle w-full flex flex-col items-center fixed left-0 top-14  md:hidden'>
							{Object.entries(PAGE_MAP).map(
								([key, { name, path }]) => (
									<Link
										className='w-full text-center p-3 hover:bg-surface-code'
										key={key}
										to={path}
										title={name}
									>
										{name}
									</Link>
								)
							)}
						</div>
					)}
				</div>
			</nav>
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

type HamburgerProps = {
	value: boolean;
	toggleValue: () => void;
};
export function Hamburger({ value, toggleValue }: HamburgerProps) {
	return (
		<button
			onClick={() => toggleValue()}
			className='ml-5 md:hidden rounded'
			aria-label='Toggle menu'
			aria-expanded={value}
		>
			<svg
				className='w-6 h-6'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				{value ? (
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M6 18L18 6M6 6l12 12'
					/>
				) : (
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M4 6h16M4 12h16M4 18h16'
					/>
				)}
			</svg>
		</button>
	);
}

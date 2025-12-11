import { useState } from 'react';
import { Link } from 'react-router';
import { PAGE_LIST, SOCIAL_LIST } from '../utils/contants';
import type { Dispatch, SetStateAction } from 'react';

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
							JSOC
						</Link>
					</div>
					{/* Menu Items */}
					<div className='hidden pt-[3px] md:flex md:items-center md:space-x-5'>
						{PAGE_LIST.map(({ link, text }, index) => (
							<Link
								className='h-8 text-lg inline-flex items-center'
								key={index}
								to={link}
							>
								{text}
							</Link>
						))}
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
									className='h-5 w-5'
									src={logo}
									alt={text}
								/>
							</Link>
						))}
					</div>

					<Hamburger state={[mobileMenuOpen, setMobileMenuOpen]} />

					{/* mobile menu drawer */}
					{mobileMenuOpen && (
						<div className=' w-full flex flex-col items-center fixed left-0 top-14 bg-white border-b border-b-slate-200 md:hidden'>
							{PAGE_LIST.map(({ link, text }, index) => (
								<Link
									onClick={() => {setMobileMenuOpen(false)}}
									className='my-2'
									key={index}
									to={link}
									title={text}
								>
									{text}
								</Link>
							))}
						</div>
					)}
				</div>
			</nav>
		</>
	);
}

type HamburgerProps = {
	state: [boolean, Dispatch<SetStateAction<boolean>>];
};
export function Hamburger({ state }: HamburgerProps) {
	const [value, setter] = state;

	return (
		<button
			onClick={() => setter(!value)}
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

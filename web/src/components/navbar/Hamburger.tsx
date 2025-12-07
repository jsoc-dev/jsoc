import type { Dispatch, SetStateAction } from 'react';

type HamburgerProps = {
	state: [boolean, Dispatch<SetStateAction<boolean>>];
};
export function Hamburger({ state }: HamburgerProps) {
	const [value, setter] = state;

	return (
		<button
			onClick={() => setter(!value)}
			className='md:hidden p-2 rounded'
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

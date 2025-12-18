import type { ReactNode } from 'react';

export function Section({
	id,
	title,
	subtitle,
	children,
	isHeading = false,
}: {
	id?: string;
	title: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	isHeading?: boolean;
}) {
	const titleStyles = isHeading ? 'text-3xl mb-6' : 'text-xl mb-4';

	return (
		<section id={id} className='mb-10'>
			{/* title */}
			<h2 className={titleStyles + ' font-semibold'}>{title}</h2>
			{/* subtitle */}
			{subtitle && <p className='text-md mb-4'>{subtitle}</p>}
			{/* content */}
			{children}
		</section>
	);
}

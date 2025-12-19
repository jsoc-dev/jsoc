import type { ReactNode } from 'react';

export type SectionProps = {
	id?: string;
	title: ReactNode;
	subtitle?: ReactNode;
	children?: ReactNode;
	isHeading?: boolean;
	centered?: boolean;
};
export function Section({
	id,
	title,
	subtitle,
	children,
	isHeading = false,
	centered = false,
}: SectionProps) {
	const alignmentCls = centered ? 'text-center' : 'text-left';
	const titleCls = isHeading ? 'text-3xl mt-14 mb-6' : 'text-xl mb-4';

	return (
		<section id={id} className={'mb-10'}>
			{/* title */}
			<h2 className={`${alignmentCls} ${titleCls} font-semibold`}>
				{title}
			</h2>

			{/* subtitle */}
			{subtitle && (
				<p className={`${alignmentCls} text-md mb-4`}>{subtitle}</p>
			)}

			{/* content */}
			{children}
		</section>
	);
}

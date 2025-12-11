import { Link } from 'react-router';
import { FRAMEWORK_LIST } from '../../utils/contants';
import type { ReactNode } from 'react';

export function GetStarted() {
	return (
		<>
			<PageHeader
				title='Get Started'
				subtitle='This page will guide you through how to use JSOC in your
					desired framework.'
			/>

			<Section
				title='Choose Framework'
				subtitle='Start by selecting the framework which your app uses.'
			>
				<div className='flex space-x-3'>
					{FRAMEWORK_LIST.map(({ text, link }, index) => (
						<Link className='link-button' key={index} to={link}>
							{text}
						</Link>
					))}
				</div>
			</Section>
		</>
	);
}

export function PageHeader({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<div className='mb-8'>
			<div className='font-semibold text-3xl mb-2'>{title}</div>
			<p className='text-md'>{subtitle}</p>
		</div>
	);
}

export function Section({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle?: string;
	children: ReactNode;
}) {
	return (
		<section className='mb-10'>
			<h2 className='font-semibold text-xl mb-2'>{title}</h2>
			{subtitle && <p className='text-md mb-4'>{subtitle}</p>}
			{children}
		</section>
	);
}

export function Back() {
	return (
		<div className=' mb-10'>
			<Link className='link-button' to={'/docs'}>
				← Back
			</Link>
		</div>
	);
}


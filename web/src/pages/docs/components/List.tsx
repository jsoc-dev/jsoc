import type { ReactNode } from 'react';
import { renderInlineCode } from './CodeInline';

export function NumericList({ children }: { children: ReactNode }) {
	return (
		<>
			<ol className='flex flex-col space-y-5 list-decimal ml-6'>
				{children}
			</ol>
		</>
	);
}

export function ListItem({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<>
			<li>
				{/* title */}
				<p className='mb-4'>{renderInlineCode(title)}</p>
				{/* content */}
				{children}
			</li>
		</>
	);
}

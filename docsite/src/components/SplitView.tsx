import { type ReactElement, Children, Fragment } from 'react';

type SplitViewProps = {
	children: [ReactElement, ReactElement];
};

export function SplitView({ children }: SplitViewProps) {
	const items = Children.toArray(children);

	return (
		<div
			className='border border-outline-subtle shadow-lg overflow-hidden rounded-xl w-full
                    flex flex-col md:flex-row'
		>
			{items.map((child, index) => (
				<Fragment key={index}>
					{child}
					{index === 0 && (
						<div className='hidden md:block w-px bg-outline-subtle' />
					)}
				</Fragment>
			))}
		</div>
	);
}

type SplitViewPaneProps = {
	header: React.ReactNode;
	children: React.ReactNode;
};

SplitView.Pane = function ({ header, children }: SplitViewPaneProps) {
	return (
		<div className='flex flex-col flex-1 min-w-0'>
			<div
				className='px-6 py-2 min-h-10 flex items-center gap-3 text-lg
                      border-b border-outline-subtle'
			>
				{header}
			</div>

			<div className='px-6 py-6 flex-1 overflow-auto'>{children}</div>
		</div>
	);
};

import { type ReactElement, type ReactNode, Children } from 'react';

type SplitViewProps = {
	className?: string;
	children: [ReactElement, ReactElement];
};

export function SplitView({ className = '', children }: SplitViewProps) {
	const splitViewPanes = Children.toArray(children);
	return (
		<div
			className={`
				border border-outline-subtle rounded-xl shadow-xl
				flex flex-col svrow:flex-row
				overflow-hidden
				${className}
			`}
		>
			{splitViewPanes.map((splitViewPane, index) => (
				<div
					className={`
						flex flex-col 
						svrow:w-1/2
						${
							index == 0
								? 'border-b border-outline-subtle svrow:border-b-0 svrow:border-r'
								: ''
						}
					`}
					key={index}
				>
					{splitViewPane}
				</div>
			))}
		</div>
	);
}

SplitView.Pane = SplitViewPane;

type SplitViewPaneProps = {
	header: ReactNode;
	children: ReactNode;
};
function SplitViewPane({ header, children }: SplitViewPaneProps) {
	return (
		<>
			{/* header-wrapper */}
			<div
				className='
					bg-surface-muted/10
					border-b border-outline-subtle
					h-10 min-h-10 max-h-10 w-full
					overflow-auto 
					px-4 md:px-6
				'
			>
				{header}
			</div>

			{/* content-wrapper */}
			<div
				className='
					bg-surface-muted
					h-96 min-h-96 w-full
					overflow-auto
					px-4 md:px-6 py-6 
					svrow:flex-1
				'
			>
				{children}
			</div>
		</>
	);
}

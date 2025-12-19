export function PaneWrapper({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export function PaneHeader({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className='px-6 py-2 flex min-h-10 max-h-10  items-center gap-3 text-lg border-b border-b-outline-subtle'>
			<span className='font-semibold'>{title}</span>
			{children}
		</div>
	);
}

export function PaneContent({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return <div className={`px-6 py-6 h-full w-full  flex flex-col ${className}`}>{children}</div>;
}

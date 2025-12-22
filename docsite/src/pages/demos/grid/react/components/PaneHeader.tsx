type PaneHeaderProps = {
    heading: string,
    children: React.ReactNode
}
export function PaneHeader({
    heading,children
}: PaneHeaderProps) {

	return (
		<>
			<div className='h-full w-full flex items-center'>
				<div className='flex h-full items-center'>
					<span className="font-semibold w-max">{heading}</span>
					<span 
						className='bg-outline-dominant 
						h-[50%] w-px
						mx-3'
					/>
				</div>
                {children}
			</div>
		</>
	);
}
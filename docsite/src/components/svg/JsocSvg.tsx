export function JsocSvg(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 100 100'
			fill='none'
			stroke='currentColor'
			strokeWidth={8}
			strokeLinecap='square'
			strokeLinejoin='miter'
      {...props}
		>
			{/* Left brace */}
			<path
				d='
					M42 18
					H28
					V36
					L18 50
					L28 64
					V82
					H42
				'
			/>

			{/* Right brace */}
			<path
				d='
					M58 18
					H72
					V36
					L82 50
					L72 64
					V82
					H58
				'
			/>

			{/* Slash */}
			<path d='M44 70 L56 30' />
		</svg>
	);
}

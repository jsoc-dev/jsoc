type BaseSvgProps = React.SVGProps<SVGSVGElement>;

export function BaseSvg({ children, ...props }: BaseSvgProps) {
	return (
		<svg
			viewBox='0 0 16 16'
			width='1em'
			height='1em'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
			{...props}
		>
			{children}
		</svg>
	);
}

export function NpmSvg(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox='0 0 512 512'
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			{...props}
		>
			<path d='M0,0v512h512V0H0z M416.1,416.1h-64.2v-256H256v256H95.9V95.9h320.2V416.1z' />
		</svg>
	);
}

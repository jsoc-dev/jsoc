import { BaseSvg } from './BaseSvg';

export function WrapOff(props: React.SVGProps<SVGSVGElement>) {
	return (
		<BaseSvg {...props}>
			{/* base wrap icon */}
			<path
				fillRule="evenodd"
				d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5
				m0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708
				l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5
				a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5
				m0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5"
			/>

			{/* off slash */}
			<path
				d="M2 2 L14 14"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</BaseSvg>
	);
}


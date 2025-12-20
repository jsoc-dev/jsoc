import { BaseSvg } from './BaseSvg';

type DisabledPathStyle = 'scroll' | 'arrow' | 'linear' | 'slashed';
type WrapTextSvgProps = React.SVGProps<SVGSVGElement> & {
	disabled?: boolean;
	disabledPathStyle?: DisabledPathStyle;
};

export function WrapTextSvg({
	disabled = false,
	disabledPathStyle = 'scroll',
	...props
}: WrapTextSvgProps) {
	const disabledStyles = {
		arrow: ArrowStyle,
		slashed: SlashedStyle,
		scroll: ScrollStyle,
		linear: LinearStyle,
	};
	const Disabled = disabledStyles[disabledPathStyle];

	return (
		<BaseSvg {...props}>
			<g transform='translate(-1 0.1) scale(1.1)'>
				{disabled ? <Disabled /> : <Enabled />}
			</g>
		</BaseSvg>
	);
}

function ScrollStyle() {
	return (
		<>
			{/* center scroll track */}
			<path
				d='M3 8 H13'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
			/>

			{/* left arrow */}
			<path
				d='M3 8 L5 6'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M3 8 L5 10'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>

			{/* right arrow */}
			<path
				d='M13 8 L11 6'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13 8 L11 10'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</>
	);
}
function ArrowStyle() {
	return (
		<>
			{/* top line */}
			<path
				d='M2.5 3.5 H13.5'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
			/>

			{/* middle line (arrow shaft) */}
			<path
				d='M2.5 8 H13.5'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
			/>

			{/* arrow head up */}
			<path
				d='M13.5 8 L11.7 6.2'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			{/* arrow head down */}
			<path
				d='M13.5 8 L11.7 9.8'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>

			{/* bottom line */}
			<path
				d='M2.5 12.5 H13.5'
				stroke='currentColor'
				strokeWidth='1'
				strokeLinecap='round'
			/>
		</>
	);
}
function LinearStyle() {
	return (
		<path
			d='M2 3.5 H10
				M2 7.5 H14
				M2 11.5 H10'
			stroke='currentColor'
			strokeWidth='1'
			strokeLinecap='round'
		/>
	);
}
function SlashedStyle() {
	return (
		<>
			<Enabled />

			{/* slash */}
			<path
				d='M2 2 L14 14'
				stroke='currentColor'
				strokeWidth='1.1'
				strokeLinecap='round'
			/>
		</>
	);
}

function Enabled() {
	return (
		<path
			fillRule='evenodd'
			d='M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5
			m0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708
			l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5
			a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5
			m0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5'
		/>
	);
}

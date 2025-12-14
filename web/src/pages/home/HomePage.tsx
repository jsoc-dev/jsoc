import { Link } from 'react-router';

export function HomePage() {
	const features = [
		['Dynamic', 'No fixed rows, columns configuration.'],
		['JSON-driven', 'Auto configured based on JSON data.'],
		['Adaptive UI', 'Powered by popular UI libraries.'],
	];

	return (
		<div>
			{/* tagline and frameworks section */}
			<section className='text-center mt-20'>
				{/* tagline */}
				<div>
					<h1 className='text-[clamp(2rem,5vw,4rem)] mb-5'>
						Introducing <b>JSOC</b> Grid
					</h1>
					<p className='text-[clamp(1rem,3vw,1.5rem)]'>
						Dynamic, JSON-driven and adaptive UI grid.
					</p>
					<div className='mt-10'>
						<Link className='link-button' to='/docs/grid/react'>
							Documentation ↗︎
						</Link>
					</div>
				</div>
			</section>

			<section className='mt-20 p-y-6 flex flex-col space-y-10 ' >
				{features.map(([featureName, featureBrief], index) => (
					<div key={index} className='inline-flex flex-col border-black border-2 rounded-2xl p-6 border-dashed'>
						<h1 className='text-[clamp(1.5rem,5vw,2rem)]'>{featureName}</h1>
						<p className='text-[clamp(0.7rem,3vw,1rem)]'>
							{featureBrief}
						</p>
					</div>
				))}
			</section>
		</div>
	);
}

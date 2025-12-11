import { Link } from 'react-router';

export function HomePage() {
	return (
		<>
			<div>
				{/* tagline and frameworks section */}
				<section className='text-center mt-20'>
					{/* tagline */}
					<div>
						<h1 className='text-[clamp(2rem,5vw,4rem)] mb-5'>
							JSON Structure Oriented Components
						</h1>
						<h3 className='text-[clamp(1rem,3vw,1.5rem)]'>
							<p>
								JSOC is a framework-agnostic system that
								converts any JSON data into fully functional UI
								components.
							</p>
						</h3>
						<div className='mt-10'>
							<Link
								className='link-button'
								to="/docs"
							>
								Get Started
							</Link>
						</div>
					</div>
				</section>

				{/* Components Hero section */}
				{/* <section className='mt-20'>
					<h1 className='text-[clamp(2rem,5vw,4rem)] mb-5'>
						Latest
					</h1>
				</section> */}
			</div>
		</>
	);
}

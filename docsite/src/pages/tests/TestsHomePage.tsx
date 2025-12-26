import { Link } from 'react-router';
import { Section } from '../../components/Section';
import { TEST_COMPONENTS } from './TestsRouter';

export function TestsHomePage() {
	return (
		<div className='flex flex-col min-h-full py-pageY'>
			<Section isHeading title='Test Components'>
				<div className='mb-4'>
					NOTE: These are components for testing generic components
					used in this docsite. These are not shipped in JSOC
					packages.
				</div>

				<div className='flex gap-4'>
					{TEST_COMPONENTS.map(([name, _], index) => (
						<Link key={index} to={name} className='link-button'>
							{name.replace('Test', '')}
						</Link>
					))}
				</div>
			</Section>
		</div>
	);
}
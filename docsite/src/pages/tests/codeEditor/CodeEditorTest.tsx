import { HashLink } from 'react-router-hash-link';
import { EXAMPLES_META } from './utils/codeEditorSampleExamples';
import { CodeEditorTestExampleSection } from './CodeEditorTestExampleSection';

export function CodeEditorTest() {
	return (
		<div className='flex flex-col gap-4 lg:flex-row lg:gap-8'>
			{/* Navigation */}
			<nav className='
				bg-white border-b border-outline-subtle 
				w-full top-belowHeader sticky 
				lg:w-56 lg:min-w-56 lg:order-2 lg:self-stretch lg:border-b-0 lg:border-l 

			'>
				<div className='
					p-4
					sticky top-belowHeader
				'>
					<h3 className='font-semibold text-lg mb-4'>Examples</h3>
					<ul className='flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible'>
						{EXAMPLES_META.map((_, index) => {
							const sectionId = `u${index + 1}`;
							return (
								<li key={index} className='shrink-0 lg:shrink'>
									<HashLink
										to={`#${sectionId}`}
										smooth
										className='text-text-secondary hover:text-text-primary transition-colors block py-1 px-2 rounded hover:bg-surface-hover whitespace-nowrap lg:whitespace-normal'
									>
										Usage #{index + 1}
									</HashLink>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>

			{/* Main content */}
			<div className='flex-1 lg:order-1 py-pageY overflow-auto'>
				{EXAMPLES_META.map((example, index) => {
					return (
						<CodeEditorTestExampleSection
							key={index}
							example={example}
							index={index}
						/>
					);
				})}
			</div>
		</div>
	);
}

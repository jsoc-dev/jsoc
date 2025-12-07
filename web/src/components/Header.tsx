import { useState } from 'react';
import { Hamburger } from './navbar/Hamburger';
import githubLogo from '../assets/github.svg';
import npmLogo from '../assets/npm.svg';
import { Link } from 'react-router';

type SocialLink =
	| 'https://github.com/jsoc-dev/jsoc'
	| 'https://www.npmjs.com/org/jsoc';

type SocialList = {
	link: SocialLink;
	text: string;
	logo: string;
}[];
const SOCIAL_LIST: SocialList = [
	{
		text: 'Github Repository',
		link: 'https://github.com/jsoc-dev/jsoc',
		logo: githubLogo,
	},
	{
		text: 'NPM Packages',
		link: 'https://www.npmjs.com/org/jsoc',
		logo: npmLogo,
	},
];

type PageLink = '/docs' | '/components';
type PageList = {
	link: PageLink;
	text: string;
}[];

const PAGE_LIST: PageList = [
	{
		link: '/docs',
		text: 'Docs',
	},
	{
		link: '/components',
		text: 'Components',
	},
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			{/* header */}
			<header className='text-xl h-14 max-h-14 w-full light-bottom-border overflow-hidden'>
				{/* navbar */}
				<nav className='h-full page-width-cap mx-auto px-4 md:px-6'>
					{/* main menu */}
					<div className='h-full flex items-center justify-between'>
						{/* left-items */}
						<div className='flex'>
							{/* logo */}
							<div className='mr-8'>
								<Link to='/' className='font-bold'>
									JSOC
								</Link>
							</div>
							{/* Menu Items */}
							<ul className='hidden md:flex space-x-3'>
								{PAGE_LIST.map(({ link, text }, index) => (
									<li key={index}>
										<Link to={link} className=''>
											{text}
										</Link>
									</li>
								))}
							</ul>
						</div>
						{/* right-items */}
						<div className='flex items-center'>
							{/* social-links */}
							<div className='flex items-center space-x-2'>
								{SOCIAL_LIST.map(
									({ link, text, logo }, index) => (
										<Link
											key={index}
											className='h-6 w-6'
											to={link}
											title={text}
											target='_blank'
											rel='noopener noreferrer'
										>
											<img src={logo} alt={text} />
										</Link>
									)
								)}
							</div>

							<Hamburger
								state={[mobileMenuOpen, setMobileMenuOpen]}
							/>

							{/* mobile menu drawer */}
							{mobileMenuOpen && (
								<div className='md:hidden fixed left-0 top-14 py-3 bg-white w-full light-bottom-border'>
									<ul>
										{PAGE_LIST.map(
											({ link, text }, index) => (
												<li
													key={index}
													className='my-2'
												>
													<Link
														to={link}
														title={text}
													>
														{text}
													</Link>
												</li>
											)
										)}
									</ul>
								</div>
							)}
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}

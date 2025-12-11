import githubLogo from '../assets/github.svg';
import npmLogo from '../assets/npm.svg';

type SocialLink =
	| 'https://github.com/jsoc-dev/jsoc'
	| 'https://www.npmjs.com/org/jsoc';

type SocialList = {
	link: SocialLink;
	text: string;
	logo: string;
}[];

export const SOCIAL_LIST: SocialList = [
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

type PageLink = '/docs' | '/comps';
type PageList = {
	link: PageLink;
	text: string;
}[];

export const PAGE_LIST: PageList = [
	{
		link: '/docs',
		text: 'Docs',
	},
	{
		link: '/comps',
		text: 'Components',
	},
];

type Framework = 'React' | 'Angular' | 'Vue';
type FrameworkList = {
	text: Framework;
	link: string;
}[];

const docsPageLink = PAGE_LIST.find((p) => p.text == 'Docs')?.link;

export const FRAMEWORK_LIST: FrameworkList = [
	{
		text: 'React',
		link: docsPageLink + '/jsoc-react',
	},
	{
		text: 'Angular',
		link: docsPageLink + '/jsoc-angular',
	},
	{
		text: 'Vue',
		link: docsPageLink + '/jsoc-vue',
	},
];

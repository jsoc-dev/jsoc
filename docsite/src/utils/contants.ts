import githubLogo from '../assets/github.svg';
import npmLogo from '../assets/npm.svg';

export type SocialLink =
	| 'https://github.com/jsoc-dev/jsoc'
	| 'https://www.npmjs.com/org/jsoc';
export type SocialList = Array<{
	link: SocialLink;
	text: string;
	logo: string;
}>;
export const SOCIAL_LIST: SocialList = [
	{
		text: 'Github',
		link: 'https://github.com/jsoc-dev/jsoc',
		logo: githubLogo,
	},
	{
		text: 'NPM',
		link: 'https://www.npmjs.com/org/jsoc',
		logo: npmLogo,
	},
];

export type Page = 'demos' | 'docs';
export type PageMap = {
	[key in Page]: {
		name: string;
		path: string;
	};
};
export const PAGE_MAP: PageMap = {
	demos: {
		name: 'Demos',
		path: '/demos',
	},
	docs: {
		name: 'Docs',
		path: '/docs',
	},
};

export type Framework = 'react' | 'angular' | 'vue';
export type Component = 'grid';
export type ComponentMap = {
	[key in Component]: {
		name: string;
		path: string;
		frameworks: Framework[];
	};
};

export const COMPONENT_MAP: ComponentMap = {
	grid: {
		name: 'JsocGrid',
		path: PAGE_MAP.docs.path + '/grid',
		frameworks: ['react'],
	},
};

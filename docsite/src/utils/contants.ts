import { GithubSvg } from '../components/svg/GithubSvg';
import { NpmSvg } from '../components/svg/NpmSvg';
import { isDevMode } from './development';

export type SocialLink =
	| 'https://github.com/jsoc-dev/jsoc'
	| 'https://www.npmjs.com/org/jsoc';
export type SocialList = Array<{
	link: SocialLink;
	text: string;
	Svg: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}>;
export const SOCIAL_LIST: SocialList = [
	{
		text: 'Github',
		link: 'https://github.com/jsoc-dev/jsoc',
		Svg: GithubSvg,
	},
	{
		text: 'NPM',
		link: 'https://www.npmjs.com/org/jsoc',
		Svg: NpmSvg,
	},
];

export type DevPage = 'tests';
export type ProdPage = 'demos' | 'docs';
export type PageMap<T extends string> = {
	[key in T]: {
		name: string;
		path: string;
	};
};
export const PROD_PAGE_MAP: PageMap<ProdPage> = {
	demos: {
		name: 'Demos',
		path: '/demos',
	},
	docs: {
		name: 'Docs',
		path: '/docs',
	},
};

export const DEV_PAGE_MAP: PageMap<DevPage | ProdPage> = {
	...PROD_PAGE_MAP,
	tests: {
		name: 'Tests',
		path: '/tests',
	},
};

export const PAGE_MAP: PageMap<ProdPage> | PageMap<DevPage> = isDevMode()
	? DEV_PAGE_MAP
	: PROD_PAGE_MAP;

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

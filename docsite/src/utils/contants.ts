import { GithubSvg } from "../components/svg/GithubSvg";
import { NpmSvg } from "../components/svg/NpmSvg";


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

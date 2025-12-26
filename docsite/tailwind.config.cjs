// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			screens: {
				navbig: '768px', // breakpoint that triggers Navbar layout to desktop view; same as md
				svrow: '1024px', // breakpoint that triggers SplitView layout to flex-row; same as lg
			},
			fontFamily: {
				// override the default mono font family that tailwind applies on code, kbd, samp, pre
				mono: [
					'Source Code Pro',
					'Fira Code',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace',
				],
			},
			colors: {
				text: {
					muted: '#475569',
					primary: 'blueviolet',
				},
				surface: {
					code: '#fbfbfb',
					codeHighlight: '#fffbe6',
					muted: '#f6f7f9',
				},
				outline: {
					subtle: '#e2e8f0',
					dominant: 'black',
				},
			},
			height: {
				header: '56px',
			},
			inset: {
				belowHeader: '56px',
			},
			spacing: {
				pageY: '48px',
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			const px = (n) => ({
				paddingLeft: theme(`spacing.${n}`),
				paddingRight: theme(`spacing.${n}`),
			});

			addUtilities({
				'.w-controlled': {
					width: '100%',
					maxWidth: theme('maxWidth.screen-xl'),
				},
				'.px-controlled': {
					...px(6),
					'@screen md': px(8),
					'@screen lg': px(10),
					'@screen 2xl': px(0),
				},
			});
		},
	],
};

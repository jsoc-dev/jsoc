// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			fontFamily: {
				code: [
					'Fira Code',
					'Source Code Pro',
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
					primary: 'black',
				},
				surface: {
					code: '#fbfbfb',
					codeHighlight: '#e5e7eb',
					muted: '#f6f7f9',
				},
				outline: {
					subtle: '#e2e8f0',
				},
			},
		},
	},
	plugins: [],
};

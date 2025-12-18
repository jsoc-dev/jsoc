// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			colors: {
				text: {
					muted: '#475569',
					primary: 'black'
				},
				surface: {
					code: '#fbfbfb',
					muted: '#f6f7f9'
				},
				outline: {
					subtle: '#e2e8f0',
				}
			},
		},
	},
	plugins: [],
};

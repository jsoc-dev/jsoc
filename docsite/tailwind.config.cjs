// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
	theme: {
		extend: {
			colors: {
				surface: {
					code: '#fbfbfb',
				},
				outline: {
					subtle: '#e2e8f0',
				}
			},
		},
	},
	plugins: [],
};

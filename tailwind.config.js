/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				DEFAULT: '#ff0000',
        alabaster: '#f4efe7',
        yellow_metal: "#715e39"
			},
		},
	},
	plugins: [],
};


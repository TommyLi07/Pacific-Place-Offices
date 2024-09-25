/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				Tondo: ['Tondo', 'sans-serif'],
				PP_Tondo_Signage: ['PP_Tondo_Signage', 'sans-serif'],
				Tondo_W01_Signage: ['Tondo_W01_Signage', 'sans-serif'],
			},
			colors: {
				DEFAULT: '#000000',
				alabaster: '#f5f1ea',
				yellow_metal: '#715e39',
			},
			maxHeight: {
				420: '420px',
				660: '660px',
			},
		},
	},
	plugins: [],
};


module.exports = {
	purge: {
		mode: "all",
		content: ["./**/*.html"],
		options: {
			whitelist: [],
		},
	},
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {},
			lineHeight: {
				reset: "1",
			},
		},
	},
	variants: {},
	plugins: [require("@tailwindcss/typography")],
};

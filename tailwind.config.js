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
			maxWidth: {
				48: "12rem",
			},
			width: {
				container: "85%",
			},
		},
	},
	variants: {},
	plugins: [require("@tailwindcss/typography")],
};

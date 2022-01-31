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
			dropShadow: {
				heavy: "6px 6px 20px rgba(0, 0, 0, 0.6)",
			},
			lineHeight: {
				reset: "1",
			},
			maxWidth: {
				48: "12rem",
				"50vw": "50vw",
			},
			width: {
				container: "85%",
			},
		},
	},
	variants: {},
	plugins: [require("@tailwindcss/typography")],
};

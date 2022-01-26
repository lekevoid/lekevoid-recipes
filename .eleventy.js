const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const pluginSass = require("eleventy-plugin-sass");
const Image = require("@11ty/eleventy-img");
const pluginPWA = require("eleventy-plugin-pwa");

module.exports = function (eleventyConfig) {
	// Disable automatic use of your .gitignore
	eleventyConfig.setUseGitIgnore(false);

	// Merge data instead of overriding
	eleventyConfig.setDataDeepMerge(true);

	// human readable date
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
	});

	// Syntax Highlighting for Code blocks
	eleventyConfig.addPlugin(syntaxHighlight);

	// Add PWA support
	eleventyConfig.addPlugin(pluginPWA, {
		swDest: "./_site/sw.js",
		globDirectory: "./_site",
	});

	// Add SASS support
	const sassPluginOptions = { watch: ["./src/static/css/**/*.{scss,sass}"], outputDir: "./_site/static/css/" };
	eleventyConfig.addPlugin(pluginSass, sassPluginOptions);

	// To Support .yaml Extension in _data
	// You may remove this if you can use JSON
	eleventyConfig.addDataExtension("yaml", (contents) => yaml.safeLoad(contents));

	// Copy Static Files to /_Site
	eleventyConfig.addPassthroughCopy({
		"./src/admin/config.yml": "./admin/config.yml",
		"./src/admin/css/styles.css": "./admin/css/styles.css",
		"./src/static/img/icons": "./assets/icons",
		"./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
		"./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
		"./node_modules/papercss/dist/paper.css": "./static/css/paper.css",
	});

	// Copy Image Folder to /_site
	eleventyConfig.addPassthroughCopy("./src/static/img");

	// Copy favicon to route of /_site
	eleventyConfig.addPassthroughCopy("./src/favicon.ico");

	// Minify HTML
	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		// Eleventy 1.0+: use this.inputPath and this.outputPath instead
		if (outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}

		return content;
	});

	// Let Eleventy transform HTML files as nunjucks
	// So that we can use .html instead of .njk
	return {
		dir: {
			input: "src",
		},
		htmlTemplateEngine: "njk",
	};
};

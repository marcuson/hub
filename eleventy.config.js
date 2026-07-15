import { defineConfig } from "11ty.ts";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import cssnano from "cssnano";
import postcss from "postcss";
import postcssNested from "postcss-nested";

export default defineConfig((eleventyConfig) => {
	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addBundle("cssbase", {
		outputFileExtension: "css",
		toFileDirectory: "assets/bundles",
		transforms: [
			async function (content) {
				let { type: bundleName, page } = this;
				let result = await postcss([postcssNested, cssnano]).process(content, {
					from: page.inputPath,
					to: null,
				});
				return result.css;
			},
		],
	});

	eleventyConfig.addBundle("jsbase", {
		outputFileExtension: "js",
		toFileDirectory: "assets/bundles",
		transforms: [
			// FIXME: Add minification for JS bundles
		],
	});

	eleventyConfig.setInputDirectory("src");
	eleventyConfig.addPassthroughCopy({
		"src/assets": "assets",
	});
});

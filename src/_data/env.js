export default function () {
	return {
		name: process.env.ELEVENTY_ENV || "prod",
	};
}

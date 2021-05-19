module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,jpg,js,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/worker.js'
};
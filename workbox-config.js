module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,jpg,html,js,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/worker.js'
};
const rp = require('request-promise');
const $ = require('cheerio');

const sundbaatParse = function(url) {
	return rp(url)
		.then(function(html) {
	return {
		name: $("td[data-label]", html).text(),
		birthday: $('.bday', html).text(),
		};
	})
	.catch(function(err) {
	//handle error
	});
};

module.exports = sundbaatParse;
const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.sundbaten.no/";

rp(url)
	.then(function(html){
		const outputInfo = $("td[data-label]", html)
		const weekdayDepartures = [];
		const result = Object.keys(outputInfo).map(function(key) {
			return [Number(key), outputInfo[key]]
		});
		// console.log($("#hverdager > tbody", html).length);
		result.forEach(element => {
			
		});
		// console.log(weekdayDepartures.toString());
		console.log(result)
	})
	.catch(function(err){
		throw new Error(err)
	});
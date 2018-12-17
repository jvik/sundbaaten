const express = require('express')
const app = express()
const port = 4005

// const pretty = require("express-prettify");
const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.sundbaten.no/";

const scraper = rp(url)
	.then(function(html){
		let departures = { 
			weekdayDepartures: [],
			saturdayDepartures: [],
			sundayDepartures: []
		};

		const weekdaySelector = $("#hverdager > tbody > tr > td", html)
		for (let i = 0; i < weekdaySelector.length; i++) {
			let departureSite = weekdaySelector[i].attribs["data-label"]
			let departureTime = weekdaySelector[i].children[0].data
			departures.weekdayDepartures.push({
				"departureSite" : departureSite,
				"departureTime" : departureTime
			});
		}

		const saturdaySelector = $("#lordager > tbody > tr > td", html)
		for (let i = 0; i < saturdaySelector.length; i++) {
			let departureSite = saturdaySelector[i].attribs["data-label"]
			let departureTime = saturdaySelector[i].children[0].data
			departures.saturdayDepartures.push({
				"departureSite" : departureSite,
				"departureTime" : departureTime
			});
		}

		const sundaySelector = $("#sondager > tbody > tr > td", html)
		for (let i = 0; i < sundaySelector.length; i++) {
			let departureSite = sundaySelector[i].attribs["data-label"]
			let departureTime = sundaySelector[i].children[0].data
			departures.sundayDepartures.push({
				"departureSite" : departureSite,
				"departureTime" : departureTime
			});
		}
		
		const jsonStringedDepartures = JSON.parse(JSON.stringify(departures))
		return jsonStringedDepartures
	}).catch(function (err) {
		throw new Error(err);
	});

app.set("json spaces", 2)

app.get('/', async (req, res) => 
	await res.json(await scraper)
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
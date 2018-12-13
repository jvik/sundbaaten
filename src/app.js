const express = require('express')
const app = express()
const port = 3000

const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.sundbaten.no/";
var departures = { weekdayDepartures: [] };

rp(url)
	.then(function(html){
		const weekdayInput = $("td[data-label]", html)
		for (let i = 0; i < weekdayInput.length; i++) {
			let departureSite = weekdayInput[i].attribs["data-label"]
			let departureTime = weekdayInput[i].children[0].data
			departures.weekdayDepartures.push( {
				"departureSite" : departureSite, 
				"departureTime" : departureTime
			}
			)};
		console.log(departures)
	})
	.catch(function(err){
		throw new Error(err)
	});

app.get('/', (req, res) => res.json(departures))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
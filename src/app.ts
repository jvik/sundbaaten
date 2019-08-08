var SlackBot = require('slackbots');
import dotenv from 'dotenv';
import utils from './utils/utils';
import { dayOfTheWeek } from './utils/utils';
import { Schedule } from './parser';
import scraper from './scraper';
import express from 'express';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

var IN_PROD = false;
const host = '0.0.0.0';
const port = process.env.PORT || 3000;
process.argv.forEach((val, index) => {
	if (val === '-production') {
		IN_PROD = true;
		console.log('Production mode');
	}
});

if (IN_PROD) {
	dotenv.config({
		path: './.env',
	});
} else {
	dotenv.config({
		path: './.env.dev',
	});
}

const app = express();

app.get('/', (req, res) => res.send('Hello'));

app.listen(port, host, () => console.log(`Slackbot is listening on port ${port}`));

var bot = new SlackBot({
	token: `${process.env.API_KEY}`,
	name: 'sundboten',
});

bot.on('start', function() {
	bot.postMessageToChannel('slackbot-test', 'Hello');
});

bot.on('error', err => console.log(err));

bot.on('message', data => {
	if (data.type !== 'message') {
		return;
	}
	handleMessage(data.text);
});

async function handleMessage(message) {
	let splitWords = '';
	if (message && message.indexOf(' ') >= 0) {
		splitWords = message.split(' ');
	}
	if (message && message.includes('hello')) {
		bot.postMessageToChannel('general', 'Hello');
	}
	if (message && message.includes('ukedag')) {
		bot.postMessageToChannel('general', `I dag er det ${utils.getWeekDay()}`);
	}
	// Tester
	if (message && message.includes('test neste')) {
		const wordsArray = message.split(' ');
		const departureDay = wordsArray[2];
		bot.postMessageToChannel(
			'slackbot-test',
			`Neste sundbåt har avgang ${await Schedule.nextDeparture(departureDay)}`
		);
	}

	if (message && message.includes('sundbåt neste')) {
		const wordsArray = message.split(' ');
		const departureDay = wordsArray[2];
		bot.postMessageToChannel(
			'general',
			`Neste sundbåt har avgang ${await Schedule.nextDeparture(departureDay)} fra ${departureDay}`
		);
	}
	if (message && message.includes('sundbåt') && dayOfTheWeek.indexOf(splitWords[1]) > 0) {
		bot.postMessageToChannel('slackbot-test', await Schedule.allDepartures(splitWords[1]));
	}
}

var SlackBot = require('slackbots');
import dotenv from 'dotenv';
import utils from './utils/utils';
import { dayOfTheWeek } from './utils/utils';
import { Schedule } from './parser';
import scraper from './scraper';
import express from 'express';

var IN_PROD = false;
const host = '0.0.0.0';

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

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => res.send('Hello'));

app.listen(process.env.APP_PORT, host, () => console.log(`Slackbot is listening on port ${process.env.APP_PORT}`));

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
	if (message && message.includes('test')) {
		bot.postMessageToChannel('slackbot-test', `Neste sundbåt har avgang ${await Schedule.nextDeparture()}`);
	}

	if (message && message.includes('sundbåt neste')) {
		bot.postMessageToChannel('general', `Neste sundbåt har avgang ${await Schedule.nextDeparture()} fra Innlandet`);
	}
	if (message && message.includes('sundbåt') && dayOfTheWeek.indexOf(splitWords[1]) > 0) {
		bot.postMessageToChannel('slackbot-test', await Schedule.allDepartures(splitWords[1]));
	}
}

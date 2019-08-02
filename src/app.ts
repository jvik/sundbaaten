var SlackBot = require('slackbots');
import dotenv from 'dotenv';
import utils from './utils/utils';
import { dayOfTheWeek } from './utils/utils';
import { Schedule } from './parser';
import scraper from './scraper';

var IN_PROD = false;

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
	const splitWords = message.split(' ');
	if (message.includes('hello')) {
		bot.postMessageToChannel('slackbot-test', console.log(await scraper));
	}
	if (message.includes('ukedag')) {
		bot.postMessageToChannel('slackbot-test', utils.getWeekDay());
	}
	if (message.includes('klokkeslett')) {
		bot.postMessageToChannel('slackbot-test', utils.getTime());
	}
	if (message.includes('sundbåt neste')) {
		bot.postMessageToChannel(
			'slackbot-test',
			await Schedule.nextDeparture()
		);
	}
	if (
		message.includes('sundbåt') &&
		dayOfTheWeek.indexOf(splitWords[1]) > 0
	) {
		bot.postMessageToChannel(
			'slackbot-test',
			await Schedule.allDepartures(splitWords[1])
		);
	}
}

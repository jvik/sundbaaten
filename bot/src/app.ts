var SlackBot = require('slackbots');
import dotenv from 'dotenv';
import { getWeekDay, getTime } from './parser';

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
	bot.postMessageToChannel('slackbot-test', 'Eat lulz');
});

bot.on('error', err => console.log(err));

bot.on('message', data => {
	if (data.type !== 'message') {
		return;
	}
	handleMessage(data.text);
	console.log(data);
});

function handleMessage(message) {
	if (message.includes(' hello')) {
		bot.postMessageToChannel('slackbot-test', 'hehehe');
	}
	if (message.includes('ukedag')) {
		bot.postMessageToChannel('slackbot-test', getWeekDay());
	}
	if (message.includes('klokkeslett')) {
		bot.postMessageToChannel('slackbot-test', getTime());
	}
}

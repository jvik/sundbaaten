import express from 'express';
import dotenv from 'dotenv';
import scraper from './scraper';

const app = express();

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

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.get('/api', async (req, res) => await res.json(await scraper));

// start the Express server
app.listen({ port: `${process.env.APP_PORT}` }, () => {
	console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';

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

// start the Express server
app.listen({ port: `${process.env.APP_PORT}` }, () => {
	console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT}`);
});

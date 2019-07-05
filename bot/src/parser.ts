import request from 'request-promise';
import Utils from './utils/utils';

export default async function getSchedule(): Promise<any> {
	var options = {
		uri: 'http://localhost:5555/api',
		headers: {
			'User-Agent': 'Request-Promise',
		},
		json: true, // Automatically parses the JSON string in the response
	};
	try {
		const response = await request(options);
		return Promise.resolve(response);
	} catch (error) {
		Promise.reject(error);
	}
}

export class Schedule {
	public static async nextDeparture(): Promise<string> {
		const schedule = await getSchedule();
		const departureTable = Utils.checkDepartureTable();

		console.log(Utils.getWeekDay());

		const relevantTable = schedule[departureTable];

		return relevantTable;
	}
}

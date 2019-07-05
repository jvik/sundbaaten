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
	public static async nextDeparture(): Promise<any> {
		const schedule = await getSchedule();
		const departureTable = Utils.checkDepartureTable();

		const relevantTable = schedule[departureTable];

		const relevantDepartures = [];

		for (let i = 0; i < relevantTable.length; i++) {
			if (
				relevantTable[i].departureTime > Utils.getTime() &&
				relevantTable[i].departureSite === 'Kirkelandet'
			) {
				console.log(relevantTable[i]);
				relevantDepartures.push(relevantTable[i]);
				if (relevantDepartures.length > 0) {
					break;
				}
			}
		}

		return relevantDepartures[0].departureTime;
	}
}

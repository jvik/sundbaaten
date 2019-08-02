import request from 'request-promise';
import Utils from './utils/utils';
import scraper from './scraper';

export class Schedule {
	public static async nextDeparture(): Promise<any> {
		const fullSchedule = await scraper;
		const departureTable = Utils.dayToTableConverter(Utils.getWeekDay());

		const relevantTable = fullSchedule[departureTable];
		console.log('TCL: Schedule -> relevantTable', relevantTable);

		const relevantDepartures = [];

		for (let i = 0; i < relevantTable.length; i++) {
			if (relevantTable[i].departureTime > Utils.getTime() && relevantTable[i].departureSite === 'Kirkelandet') {
				relevantDepartures.push(relevantTable[i]);
			}
		}

		return relevantDepartures[0].departureTime;
	}

	public static async allDepartures(daytoday: string): Promise<string> {
		const schedule = await scraper;
		const relevantTable = Utils.dayToTableConverter(daytoday);

		const relevantDepartures = schedule[relevantTable];

		for (let i = 0; i < relevantDepartures; i++) {}
		return '';
	}
}

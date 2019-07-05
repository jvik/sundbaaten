export default class Utils {
	public static getTime(): string {
		const dateToday = new Date();
		const timeNow = dateToday.getHours() + ':' + dateToday.getMinutes();
		return timeNow;
	}

	public static getWeekDay() {
		var date = new Date();

		var weekday = new Array(7);
		weekday[0] = 'søndag';
		weekday[1] = 'mandag';
		weekday[2] = 'tirsdag';
		weekday[3] = 'onsdag';
		weekday[4] = 'torsdag';
		weekday[5] = 'fredag';
		weekday[6] = 'lørdag';
		var dateToday = weekday[date.getDay()];

		return dateToday;
	}

	public static checkDepartureTable() {
		let departureTable = '';
		switch (Utils.getWeekDay()) {
			case 'søndag':
				departureTable = 'sundayDepartures';
				break;
			case 'mandag':
			case 'tirsdag':
			case 'onsdag':
			case 'torsdag':
			case 'fredag':
				departureTable = 'weekdayDepartures';
				break;
			case 'lørdag':
				departureTable = 'saturdayDepartures';
				break;
		}
		return departureTable;
	}
}

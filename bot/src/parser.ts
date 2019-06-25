export function getWeekDay() {
	var date = new Date();

	var weekday = new Array(7);
	weekday[0] = 'søndag';
	weekday[1] = 'mandag';
	weekday[2] = 'tirsdag';
	weekday[3] = 'onsdag';
	weekday[4] = 'torsdag';
	weekday[5] = 'fredag';
	weekday[6] = 'søndag';
	var dateToday = weekday[date.getDay()];

	return dateToday;
}

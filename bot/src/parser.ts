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

export function getTime() {
	const dateToday = new Date();
	const timeNow =
		dateToday.getHours() +
		':' +
		dateToday.getMinutes() +
		':' +
		dateToday.getSeconds();
	return timeNow;
}

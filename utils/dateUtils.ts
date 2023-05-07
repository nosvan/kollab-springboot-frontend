export function dateToMonthName(date: Date): string {
  return date.toLocaleString('default', { month: 'short' });
}

export function dateToLongMonthName(date: Date): string {
  return date.toLocaleString('default', { month: 'long' });
}

export function dateToDayName(date: Date): string {
  return date.toLocaleString('default', { weekday: 'short' });
}

export function dateToLongDayName(date: Date): string {
  return date.toLocaleString('default', { weekday: 'long' });
}

export function dateToYYYYMMDD(date: Date): string {
  const dateInParts = new Date(date).toLocaleDateString('locale', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/');
  return `${dateInParts[2]}-${dateInParts[0]}-${dateInParts[1]}`;
}

export function dateStringYYYYMMDDtoMMDDYYYYwithSlashes(date: string): string {
  const dateInParts = date.split('-');
  return `${dateInParts[1]}/${dateInParts[2]}/${dateInParts[0]}`;
}

export function getTimeCeiling(date: Date, interval: number, addOn: number = 0) {
  const ms = 1000 * 60 * interval;
  const time = new Date(
    Math.ceil(date.getTime() / ms) * ms + addOn * 60 * 1000
  );
  let hour = time.getHours().toString();
  if(hour.length == 1){
    hour = `0${hour}`;
  }
  let minute = time.getMinutes().toString();
  if(minute.length == 1){
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

export function getTimeHourMinuteString(date: Date) {
  const dateLocal = new Date(date);
  let hour = dateLocal.getHours().toString();
  if(hour.length == 1){
    hour = `0${hour}`;
  }
  let minute = dateLocal.getMinutes().toString();
  if(minute.length == 1){
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

export function getDays(days: number, selectedDate: Date) {
  const daysArray: Date[] = [];
  if (days == 1) {
    daysArray.push(selectedDate);
    return daysArray;
  }
  const dayOfWeek = selectedDate.getDay();
  // weekly
  if (days == 7) {
    daysArray[dayOfWeek] = selectedDate;
    for (let i = 0; i < days; i++) {
      if (i !== dayOfWeek) {
        daysArray[i] = new Date(
          selectedDate.getTime() + (i - dayOfWeek) * 24 * 60 * 60 * 1000
        );
      }
    }
    return daysArray;
    // monthly
  } else {
    const dayInMonth = selectedDate.getDate();
    const daysInMonth = getDaysInMonth(selectedDate);
    const dayOfWeekOfFirstDayOfMonth = getDayOfWeekForFirstDayOfMonth(selectedDate)
    const dayOfWeekOfLastDayOfMonth = getDayOfWeekForLastDayOfMonth(selectedDate)
    const daysToHaveOnView = (dayOfWeekOfFirstDayOfMonth-1) + daysInMonth + (7 - (dayOfWeekOfLastDayOfMonth))
    const dayInMonthOffsetToDaysToHaveOnView = dayInMonth + (dayOfWeekOfFirstDayOfMonth-2);
    const selectedDateTime = selectedDate.getTime();
    for (let i = 0; i < daysToHaveOnView; i++) {
        daysArray[i] = new Date(
          selectedDateTime + (i - dayInMonthOffsetToDaysToHaveOnView) * 24 * 60 * 60 * 1000
        );
    }
    return daysArray;
  }
}

export function getDayOfWeekForFirstDayOfMonth(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay()+1
}

export function getDayOfWeekForLastDayOfMonth(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    getDaysInMonth(date)
  ).getDay()+1
}

export function getDaysInNextMonth(date: Date): number {
  return new Date(date.getFullYear(),date.getMonth() + 2,0).getDate();;
}

export function getDaysInPrevMonth(date: Date): number {
  return new Date(date.getFullYear(),date.getMonth(), 0).getDate();
}

export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(),date.getMonth() + 1, 0).getDate();
}

export function getMiddleDayOfMonth(date: Date): Date {
  const daysInMonth = getDaysInMonth(date);
  return new Date(date.getFullYear(), date.getMonth(), Math.floor(daysInMonth / 2));
}

export function incrementDate(date: Date, days: number) {
  if(days == 30) {
    const daysInMonth = getDaysInMonth(date);
    const daysUntilNextMonth = (daysInMonth - (date.getDate() + 1)) + 10
    const newDate = new Date(date.getTime() + daysUntilNextMonth * 24 * 60 * 60 * 1000)
    return getMiddleDayOfMonth(newDate); 
  } else {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}

export function decrementDate(date: Date, days: number) {
  if(days == 30) {
    return getMiddleDayOfMonth(new Date(date.getTime() - (date.getDate() + 10) * 24 * 60 * 60 * 1000));
  } else {
    return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  }
}

export function dateStringToNormalizedDateString(date: string){
  return new Date(date).toDateString()
}

export function dateRangeTimeValid(datePart: string, timePart: string, datePartEnd: string, timePartEnd: string): boolean {
  return new Date(`${datePart}T${timePart}`).getTime() <= new Date(`${datePartEnd}T${timePartEnd}`).getTime();
}

export function dateRangeValid(datePart: string, datePartEnd: string): boolean {
  return new Date(`${datePart}T00:00`).getTime() <= new Date(`${datePartEnd}T00:00`).getTime();
}

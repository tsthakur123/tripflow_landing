/**
 * Dynamic Long Weekend Calculator Utility
 * Calculates remaining long weekends dynamically based on the current date.
 */

// Helper to get Nth occurrence of a specific weekday in a month (0 = Sun, 1 = Mon, ..., 6 = Sat)
function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date {
  const date = new Date(year, month, 1);
  let count = 0;
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) {
      count++;
      if (count === n) {
        return new Date(date);
      }
    }
    date.setDate(date.getDate() + 1);
  }
  return date;
}

// Helper to get last occurrence of a specific weekday in a month
function getLastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const date = new Date(year, month + 1, 0); // Last day of month
  while (date.getDay() !== weekday) {
    date.setDate(date.getDate() - 1);
  }
  return new Date(date);
}

// Helper to calculate Easter Sunday (Anonymous Gregorian algorithm)
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed month
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

export interface LongWeekendInfo {
  name: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Returns all long weekend opportunities in a given year.
 */
export function getLongWeekendsForYear(year: number): LongWeekendInfo[] {
  const holidays: { name: string; date: Date }[] = [];

  // Fixed holidays
  holidays.push({ name: "New Year's Day", date: new Date(year, 0, 1) });
  holidays.push({ name: "Juneteenth", date: new Date(year, 5, 19) });
  holidays.push({ name: "Independence Day", date: new Date(year, 6, 4) });
  holidays.push({ name: "Veterans Day", date: new Date(year, 10, 11) });
  holidays.push({ name: "Christmas Day", date: new Date(year, 11, 25) });
  holidays.push({ name: "New Year's Eve", date: new Date(year, 11, 31) });

  // Floating holidays
  holidays.push({ name: "MLK Jr. Day", date: getNthWeekdayOfMonth(year, 0, 1, 3) }); // 3rd Monday in Jan
  holidays.push({ name: "Presidents' Day", date: getNthWeekdayOfMonth(year, 1, 1, 3) }); // 3rd Monday in Feb

  const easter = getEasterSunday(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  holidays.push({ name: "Good Friday", date: goodFriday });

  holidays.push({ name: "Memorial Day", date: getLastWeekdayOfMonth(year, 4, 1) }); // Last Monday in May
  holidays.push({ name: "Labor Day", date: getNthWeekdayOfMonth(year, 8, 1, 1) }); // 1st Monday in Sep
  holidays.push({ name: "Indigenous Peoples' Day", date: getNthWeekdayOfMonth(year, 9, 1, 2) }); // 2nd Monday in Oct

  const thanksgiving = getNthWeekdayOfMonth(year, 10, 4, 4); // 4th Thursday in Nov
  holidays.push({ name: "Thanksgiving Day", date: thanksgiving });
  const blackFriday = new Date(thanksgiving);
  blackFriday.setDate(thanksgiving.getDate() + 1);
  holidays.push({ name: "Day after Thanksgiving", date: blackFriday });

  // Process holidays to extract distinct long weekends
  const longWeekends: LongWeekendInfo[] = [];
  const seenDates = new Set<string>();

  for (const h of holidays) {
    const dayOfWeek = h.date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (dayOfWeek === 5) {
      // Friday holiday: Fri-Sat-Sun
      startDate = new Date(h.date);
      endDate = new Date(h.date);
      endDate.setDate(endDate.getDate() + 2);
    } else if (dayOfWeek === 1) {
      // Monday holiday: Sat-Sun-Mon
      startDate = new Date(h.date);
      startDate.setDate(startDate.getDate() - 2);
      endDate = new Date(h.date);
    } else if (dayOfWeek === 4) {
      // Thursday holiday: Thu-Fri-Sat-Sun (4-day)
      startDate = new Date(h.date);
      endDate = new Date(h.date);
      endDate.setDate(endDate.getDate() + 3);
    } else if (dayOfWeek === 2) {
      // Tuesday holiday: Sat-Sun-Mon-Tue (4-day bridge)
      startDate = new Date(h.date);
      startDate.setDate(startDate.getDate() - 3);
      endDate = new Date(h.date);
    } else if (dayOfWeek === 6) {
      // Saturday holiday (Observed Friday): Fri-Sat-Sun
      startDate = new Date(h.date);
      startDate.setDate(startDate.getDate() - 1);
      endDate = new Date(h.date);
      endDate.setDate(endDate.getDate() + 1);
    } else if (dayOfWeek === 0) {
      // Sunday holiday (Observed Monday): Sat-Sun-Mon
      startDate = new Date(h.date);
      startDate.setDate(startDate.getDate() - 1);
      endDate = new Date(h.date);
      endDate.setDate(endDate.getDate() + 1);
    }

    if (startDate && endDate) {
      const key = `${startDate.toISOString().split("T")[0]}_${endDate.toISOString().split("T")[0]}`;
      if (!seenDates.has(key)) {
        seenDates.add(key);
        longWeekends.push({ name: h.name, startDate, endDate });
      }
    }
  }

  // Sort by startDate
  return longWeekends.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

/**
 * Calculates remaining long weekends from reference date (defaults to now).
 */
export function getRemainingLongWeekendsCount(fromDate: Date = new Date()): number {
  const currentYear = fromDate.getFullYear();
  const currentYearWeekends = getLongWeekendsForYear(currentYear);

  // Filter for long weekends whose end date is on or after fromDate
  const todayReset = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const remainingThisYear = currentYearWeekends.filter((lw) => lw.endDate >= todayReset);

  // If late in the year and fewer than 3 remain, include next year's lookahead
  if (remainingThisYear.length < 3) {
    const nextYearWeekends = getLongWeekendsForYear(currentYear + 1);
    const oneYearLater = new Date(fromDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const remainingNextYear = nextYearWeekends.filter((lw) => lw.startDate <= oneYearLater);
    return remainingThisYear.length + remainingNextYear.length;
  }

  return remainingThisYear.length;
}

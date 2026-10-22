// Jalali / Shamsi Calendar Utility
export const PERSIAN_MONTH_NAMES = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const PERSIAN_WEEKDAY_NAMES = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
  'شنبه',
];

export interface JalaliDate {
  jy: number;
  jm: number;
  jd: number;
  str: string; // "1405/05/05"
  formatted: string; // "۵ مرداد ۱۴۰۵"
  weekdayName: string; // "دوشنبه"
}

// Helper to convert English digits to Persian digits
export function toPersianDigits(numStr: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return numStr.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
}

// Convert Gregorian to Jalali
export function gregorianToJalali(gy: number, gm: number, gd: number): JalaliDate {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  const monthName = PERSIAN_MONTH_NAMES[jm - 1];
  const gDate = new Date(gy + (gy <= 1600 ? 621 : 1600), gm - 1, gd);
  const weekdayName = PERSIAN_WEEKDAY_NAMES[gDate.getDay()];

  const mStr = jm < 10 ? `0${jm}` : `${jm}`;
  const dStr = jd < 10 ? `0${jd}` : `${jd}`;
  const str = `${jy}/${mStr}/${dStr}`;
  const formatted = `${weekdayName} ${toPersianDigits(jd)} ${monthName} ${toPersianDigits(jy)}`;

  return { jy, jm, jd, str, formatted, weekdayName };
}

// Get current Jalali date
export function getTodayJalali(): JalaliDate {
  const now = new Date();
  return gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

// Get list of upcoming available Jalali dates (e.g., next 30 days)
export function getUpcomingJalaliDates(count: number = 30): JalaliDate[] {
  const result: JalaliDate[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);
    result.push(
      gregorianToJalali(nextDate.getFullYear(), nextDate.getMonth() + 1, nextDate.getDate())
    );
  }
  return result;
}

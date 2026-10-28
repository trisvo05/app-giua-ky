const DAY = 86_400_000;

export function parseDate(value: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) {
    return null;
  }
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) {
    return null;
  }
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${date.getFullYear()}`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function calendarDay(date: Date): number {
  const utc = new Date(0);
  utc.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  utc.setUTCHours(0, 0, 0, 0);
  return utc.getTime() / DAY;
}

export function daysUntil(value: string, today = new Date()): number {
  const due = parseDate(value);
  return due ? calendarDay(due) - calendarDay(today) : 0;
}

export function validateDueDate(
  value: string,
  editing: boolean,
  today = new Date(),
): string | undefined {
  if (!parseDate(value)) {
    return 'Nhập ngày hợp lệ theo định dạng dd/mm/yyyy.';
  }
  if (!editing && daysUntil(value, today) < 0) {
    return 'Hạn hoàn thành không được trước hôm nay.';
  }
  return undefined;
}

export function timeLabel(value: string, today = new Date()): string {
  const days = daysUntil(value, today);
  return days > 0
    ? `Còn ${days} ngày`
    : days < 0
    ? `Quá hạn ${-days} ngày`
    : 'Hạn hôm nay';
}

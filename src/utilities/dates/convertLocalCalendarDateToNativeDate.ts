import { CalendarDate } from "../../models/core/date/CalendarDate";

export const convertLocalCalendarDateToNativeDate = (
  calendarDate: CalendarDate
): Date => {
  const { year, month, day } = calendarDate;
  // JavaScript months are 0-based, subtract 1 from the month to convert it from 1-based to 0-based
  return new Date(year, month - 1, day);
};

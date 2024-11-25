import { CalendarDate } from "../../models/core/date/CalendarDate";

export const convertNativeDateToLocalCalendarDate = (
  date: Date
): CalendarDate => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // JavaScript months are 0-based, so add 1
    day: date.getDate(),
  };
};

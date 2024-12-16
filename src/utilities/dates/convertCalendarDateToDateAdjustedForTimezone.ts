import { CalendarDate } from "@kismet_ai/foundation";

interface ConvertCalendarDateToDateAdjustedForTimezoneProps {
  calendarDate: CalendarDate;
}

export const convertCalendarDateToDateAdjustedForTimezone = ({
  calendarDate,
}: ConvertCalendarDateToDateAdjustedForTimezoneProps): Date => {
  const utcDate = new Date(
    Date.UTC(calendarDate.year, calendarDate.month - 1, calendarDate.day)
  ); // month is zero-indexed in Date constructor

  if (!calendarDate.timeZone) {
    return utcDate; // Return UTC date if timeZone is not provided
  }

  const userTimezoneDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: calendarDate.timeZone })
  );
  return userTimezoneDate;
};

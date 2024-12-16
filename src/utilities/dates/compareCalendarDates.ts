import { CalendarDate } from "@kismet_ai/foundation";
import { convertCalendarDateToDateAdjustedForTimezone } from "./convertCalendarDateToDateAdjustedForTimezone";

export enum CalendarDateComarison {
  FIRST_DATE_OCCURS_BEFORE_SECOND_DATE = -1,
  FIRST_DATE_OCCURS_AFTER_SECOND_DATE = 1,
  DATES_ARE_EQUAL = 0,
}

export interface CompareCalendarDatesProps {
  firstCalendarDate: CalendarDate;
  secondCalendarDate: CalendarDate;
}

export function compareCalendarDates({
  firstCalendarDate,
  secondCalendarDate,
}: CompareCalendarDatesProps): CalendarDateComarison {
  const firstDate = convertCalendarDateToDateAdjustedForTimezone({
    calendarDate: firstCalendarDate,
  });

  const secondDate = convertCalendarDateToDateAdjustedForTimezone({
    calendarDate: secondCalendarDate,
  });

  if (firstDate < secondDate)
    return CalendarDateComarison.FIRST_DATE_OCCURS_BEFORE_SECOND_DATE;
  if (firstDate > secondDate)
    return CalendarDateComarison.FIRST_DATE_OCCURS_AFTER_SECOND_DATE;

  return CalendarDateComarison.DATES_ARE_EQUAL;
}

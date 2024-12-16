import { CalendarDate } from "@kismet_ai/foundation";

interface RenderAbbreviatedMonthDayOptionalYearFormatCalendarDateProps {
  calendarDate: CalendarDate;
}

export const renderAbbreviatedMonthDayOptionalYearFormatCalendarDate = ({
  calendarDate,
}: RenderAbbreviatedMonthDayOptionalYearFormatCalendarDateProps): string => {
  const { year, month, day, timeZone } = calendarDate;

  // Create a JavaScript Date object using the CalendarDate information
  const jsDate = new Date(Date.UTC(year, month - 1, day));

  // Use Intl.DateTimeFormat to format the date as "Dec 13"
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: timeZone || "UTC", // Default to UTC if timeZone is undefined
  });

  return formatter.format(jsDate);
};

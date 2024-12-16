import { CalendarDate } from "@kismet_ai/foundation";

interface RenderMonthFormatCalendarDateProps {
  calendarDate: CalendarDate;
}

export const renderMonthFormatCalendarDate = ({
  calendarDate,
}: RenderMonthFormatCalendarDateProps): string => {
  const { year, month, day } = calendarDate;

  // Create a JavaScript Date object. Note: month is zero-indexed in JS.
  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat to get the full month name
  const formatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  return formatter.format(date);
};

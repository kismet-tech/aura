import { CalendarDate } from "@/models/core/date/CalendarDate";

interface RenderMonthDayYearFormatCalendarDateProps {
  calendarDate: CalendarDate;
}

export const renderMonthDayYearFormatCalendarDate = ({
  calendarDate,
}: RenderMonthDayYearFormatCalendarDateProps): string => {
  const { year, month, day } = calendarDate;

  // Validate month and day
  if (month < 1 || month > 12) {
    throw new Error(
      `Invalid month: ${month}. Month should be between 1 and 12.`
    );
  }
  if (day < 1 || day > 31) {
    // Basic validation; can be enhanced
    throw new Error(`Invalid day: ${day}. Day should be between 1 and 31.`);
  }

  // Create a Date object (Note: months are zero-indexed in JavaScript Date)
  const date = new Date(year, month - 1, day);

  // Use Intl.DateTimeFormat for locale-aware formatting
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};

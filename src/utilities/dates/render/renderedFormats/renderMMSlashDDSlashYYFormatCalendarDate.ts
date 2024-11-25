import { CalendarDate } from "@/models/core/date/CalendarDate";

interface RenderMMSlashDDSlashYYFormatCalendarDateProps {
  calendarDate: CalendarDate;
}

export const renderMMSlashDDSlashYYFormatCalendarDate = ({
  calendarDate,
}: RenderMMSlashDDSlashYYFormatCalendarDateProps): string => {
  const month = calendarDate.month.toString().padStart(2, "0");

  const day = calendarDate.day.toString().padStart(2, "0");

  const year = calendarDate.year.toString().slice(-2);

  return `${month}/${day}/${year}`;
};

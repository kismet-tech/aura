import { CalendarDate } from "../../models/core/date/CalendarDate";

interface GetDaysBetweenCalendarDatesProps {
  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;
}

export const getDaysBetweenCalendarDates = ({
  startCalendarDate,
  endCalendarDate,
}: GetDaysBetweenCalendarDatesProps): { days: number } => {
  const start = new Date(
    startCalendarDate.year,
    startCalendarDate.month - 1,
    startCalendarDate.day
  );
  const end = new Date(
    endCalendarDate.year,
    endCalendarDate.month - 1,
    endCalendarDate.day
  );

  // Calculate the difference in time
  const diffTime = Math.abs(end.getTime() - start.getTime());

  // Convert time difference to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { days: diffDays };
};

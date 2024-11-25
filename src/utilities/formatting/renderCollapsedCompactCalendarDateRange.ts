import { CalendarDate } from "@/models/core/date/CalendarDate";
import { format } from "date-fns";

interface RenderCollapsedCompactCalendarDateRangeProps {
  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;
}

export function renderCollapsedCompactCalendarDateRange({
  startCalendarDate,
  endCalendarDate,
}: RenderCollapsedCompactCalendarDateRangeProps): string {
  const startDate = new Date(
    startCalendarDate.year,
    startCalendarDate.month - 1,
    startCalendarDate.day
  );
  const endDate = new Date(
    endCalendarDate.year,
    endCalendarDate.month - 1,
    endCalendarDate.day
  );

  const isSameMonthAndYear =
    startCalendarDate.month === endCalendarDate.month &&
    startCalendarDate.year === endCalendarDate.year;

  const formattedStartDate = format(
    startDate,
    isSameMonthAndYear ? "MMM d" : "MMM d, yyyy"
  );
  const formattedEndDate = format(
    endDate,
    isSameMonthAndYear ? "d" : "d, yyyy"
  );

  return isSameMonthAndYear
    ? `${formattedStartDate}-${formattedEndDate}`
    : `${formattedStartDate} - ${formattedEndDate}`;
}

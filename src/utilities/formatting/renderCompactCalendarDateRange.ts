import { CalendarDateRange } from "../../models/core/date/CalendarDateRange";
import { renderCompactCalendarDate } from "./renderCompactCalendarDate";

interface RenderCompactCalendarDateRangeProps {
  calendarDateRange: CalendarDateRange;
}

export const renderCompactCalendarDateRange = ({
  calendarDateRange,
}: RenderCompactCalendarDateRangeProps): string => {
  const startDate = renderCompactCalendarDate({
    calendarDate: calendarDateRange.startCalendarDate,
  });

  const endDate = renderCompactCalendarDate({
    calendarDate: calendarDateRange.endCalendarDate,
  });

  return `${startDate} - ${endDate}`;
};

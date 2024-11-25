import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { renderCalendarDate } from "./renderCalendarDate";
import { RenderedCalendarDateRangeJoinFormat } from "./RenderedCalendarDateRangeJoinFormat";

interface RenderCalendarDateRangeProps {
  calendarDateRange: CalendarDateRange;
  renderedCalendarDateFormat: RenderedCalendarDateFormat;
  renderedCalendarDateRangeJoinFormat: RenderedCalendarDateRangeJoinFormat;
  collapse: boolean;
}

export const renderCalendarDateRange = ({
  calendarDateRange,
  renderedCalendarDateFormat,
  renderedCalendarDateRangeJoinFormat,
  collapse,
}: RenderCalendarDateRangeProps): string => {
  const startDate = renderCalendarDate({
    calendarDate: calendarDateRange.startCalendarDate,
    format: renderedCalendarDateFormat,
  });

  const endDate = renderCalendarDate({
    calendarDate: calendarDateRange.endCalendarDate,
    format: renderedCalendarDateFormat,
  });

  if (collapse && startDate === endDate) {
    return startDate;
  }

  if (
    renderedCalendarDateRangeJoinFormat ===
    RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE
  ) {
    return `${startDate} - ${endDate}`;
  } else {
    throw new Error(
      `Unsupported format: ${renderedCalendarDateRangeJoinFormat}`
    );
  }
};

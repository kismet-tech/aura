import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { renderCalendarDate } from "./renderCalendarDate";
import { RenderedCalendarDateRangeJoinFormat } from "./RenderedCalendarDateRangeJoinFormat";
import { format } from "date-fns";

export interface RenderedCalendarDateCollapseStrategy {
  collapseSameDay: boolean;
  collapseSameMonth: boolean;
}

interface RenderCalendarDateRangeProps {
  calendarDateRange: CalendarDateRange;
  renderedCalendarDateFormat: RenderedCalendarDateFormat;
  renderedCalendarDateRangeJoinFormat: RenderedCalendarDateRangeJoinFormat;
  collapseStrategy: RenderedCalendarDateCollapseStrategy;
}

export const renderCalendarDateRange = ({
  calendarDateRange,
  renderedCalendarDateFormat,
  renderedCalendarDateRangeJoinFormat,
  collapseStrategy,
}: RenderCalendarDateRangeProps): string => {
  if (
    collapseStrategy.collapseSameDay &&
    calendarDateRange.startCalendarDate.year ===
      calendarDateRange.endCalendarDate.year &&
    calendarDateRange.startCalendarDate.month ===
      calendarDateRange.endCalendarDate.month &&
    calendarDateRange.startCalendarDate.day ===
      calendarDateRange.endCalendarDate.day
  ) {
    const startDate = renderCalendarDate({
      calendarDate: calendarDateRange.startCalendarDate,
      format: renderedCalendarDateFormat,
    });
    return startDate;
  }

  if (
    collapseStrategy.collapseSameMonth &&
    calendarDateRange.startCalendarDate.year ===
      calendarDateRange.endCalendarDate.year &&
    calendarDateRange.startCalendarDate.month ===
      calendarDateRange.endCalendarDate.month
  ) {
    if (
      renderedCalendarDateFormat === RenderedCalendarDateFormat.MONTH_DAY_YEAR
    ) {
      const month = renderCalendarDate({
        calendarDate: calendarDateRange.startCalendarDate,
        format: RenderedCalendarDateFormat.MONTH,
      });

      return `${month} ${calendarDateRange.startCalendarDate.day} - ${calendarDateRange.endCalendarDate.day}, ${calendarDateRange.startCalendarDate.year}`;
    }

    const startDate = renderCalendarDate({
      calendarDate: calendarDateRange.startCalendarDate,
      format: renderedCalendarDateFormat,
    });

    return `${startDate} - ${calendarDateRange.endCalendarDate.day}`;
  }

  const startDate = renderCalendarDate({
    calendarDate: calendarDateRange.startCalendarDate,
    format: renderedCalendarDateFormat,
  });

  const endDate = renderCalendarDate({
    calendarDate: calendarDateRange.endCalendarDate,
    format: renderedCalendarDateFormat,
  });

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

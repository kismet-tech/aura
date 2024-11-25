import { CalendarDate } from "@/models/core/date/CalendarDate";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { renderMMSlashDDSlashYYFormatCalendarDate } from "./renderedFormats/renderMMSlashDDSlashYYFormatCalendarDate";
import { renderAbbreviatedMonthDayOptionalYearFormatCalendarDate } from "./renderedFormats/renderAbbreviatedMonthDayOptionalYearFormatCalendarDate";

interface RenderCalendarDateProps {
  calendarDate: CalendarDate;
  format: RenderedCalendarDateFormat;
}

export const renderCalendarDate = ({
  calendarDate,
  format,
}: RenderCalendarDateProps): string => {
  if (format === RenderedCalendarDateFormat.MM_SLASH_DD_SLASH_YY) {
    return renderMMSlashDDSlashYYFormatCalendarDate({
      calendarDate,
    });
  } else if (
    format === RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR
  ) {
    return renderAbbreviatedMonthDayOptionalYearFormatCalendarDate({
      calendarDate,
    });
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
};

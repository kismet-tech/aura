import { CalendarDate } from "@kismet_ai/foundation";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { renderMMSlashDDSlashYYFormatCalendarDate } from "./renderedFormats/renderMMSlashDDSlashYYFormatCalendarDate";
import { renderAbbreviatedMonthDayOptionalYearFormatCalendarDate } from "./renderedFormats/renderAbbreviatedMonthDayOptionalYearFormatCalendarDate";
import { renderMonthDayYearFormatCalendarDate } from "./renderedFormats/renderMonthDayYearFormatCalendarDate";
import { renderMonthFormatCalendarDate } from "./renderedFormats/renderMonthFormatCalendarDate";

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
  } else if (format === RenderedCalendarDateFormat.MONTH_DAY_YEAR) {
    return renderMonthDayYearFormatCalendarDate({
      calendarDate,
    });
  } else if (format === RenderedCalendarDateFormat.MONTH) {
    return renderMonthFormatCalendarDate({
      calendarDate,
    });
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
};

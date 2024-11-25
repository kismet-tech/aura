import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "./RenderedCalendarDateRangeJoinFormat";
interface RenderCalendarDateRangeProps {
    calendarDateRange: CalendarDateRange;
    renderedCalendarDateFormat: RenderedCalendarDateFormat;
    renderedCalendarDateRangeJoinFormat: RenderedCalendarDateRangeJoinFormat;
    collapse: boolean;
}
export declare const renderCalendarDateRange: ({ calendarDateRange, renderedCalendarDateFormat, renderedCalendarDateRangeJoinFormat, collapse, }: RenderCalendarDateRangeProps) => string;
export {};

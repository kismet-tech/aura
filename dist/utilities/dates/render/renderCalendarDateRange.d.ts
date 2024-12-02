import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "./RenderedCalendarDateRangeJoinFormat";
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
export declare const renderCalendarDateRange: ({ calendarDateRange, renderedCalendarDateFormat, renderedCalendarDateRangeJoinFormat, collapseStrategy, }: RenderCalendarDateRangeProps) => string;
export {};

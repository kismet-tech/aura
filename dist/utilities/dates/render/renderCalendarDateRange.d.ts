import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "./RenderedCalendarDateRangeJoinFormat";
import { CalendarDateRange } from "@kismet_ai/foundation";
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

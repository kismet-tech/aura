import { CalendarDate } from "@/models/core/date/CalendarDate";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
interface RenderCalendarDateProps {
    calendarDate: CalendarDate;
    format: RenderedCalendarDateFormat;
}
export declare const renderCalendarDate: ({ calendarDate, format, }: RenderCalendarDateProps) => string;
export {};

import { CalendarDate } from "@kismet_ai/foundation";
import { RenderedCalendarDateFormat } from "./RenderedCalendarDateFormat";
interface RenderCalendarDateProps {
    calendarDate: CalendarDate;
    format: RenderedCalendarDateFormat;
}
export declare const renderCalendarDate: ({ calendarDate, format, }: RenderCalendarDateProps) => string;
export {};

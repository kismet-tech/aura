import { CalendarDate } from "../../models/core/date/CalendarDate";
interface GetTodayCalendarDateProps {
    timeZone?: string;
}
export declare const getTodayCalendarDate: ({ timeZone, }: GetTodayCalendarDateProps) => CalendarDate;
export {};

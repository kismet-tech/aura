import { CalendarDate } from "../../models/core/date/CalendarDate";
interface GetDaysBetweenCalendarDatesProps {
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
}
export declare const getDaysBetweenCalendarDates: ({ startCalendarDate, endCalendarDate, }: GetDaysBetweenCalendarDatesProps) => {
    days: number;
};
export {};

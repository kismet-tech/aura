import { CalendarDate } from "@kismet_ai/foundation";
interface GetDaysBetweenCalendarDatesProps {
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
}
export declare const getDaysBetweenCalendarDates: ({ startCalendarDate, endCalendarDate, }: GetDaysBetweenCalendarDatesProps) => {
    days: number;
};
export {};

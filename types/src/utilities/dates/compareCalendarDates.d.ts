import { CalendarDate } from "../../models/core/date/CalendarDate";
export declare enum CalendarDateComarison {
    FIRST_DATE_OCCURS_BEFORE_SECOND_DATE = -1,
    FIRST_DATE_OCCURS_AFTER_SECOND_DATE = 1,
    DATES_ARE_EQUAL = 0
}
export interface CompareCalendarDatesProps {
    firstCalendarDate: CalendarDate;
    secondCalendarDate: CalendarDate;
}
export declare function compareCalendarDates({ firstCalendarDate, secondCalendarDate, }: CompareCalendarDatesProps): CalendarDateComarison;

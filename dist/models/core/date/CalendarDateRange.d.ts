import { CalendarDate } from "@kismet_ai/foundation";
export interface CalendarDateRange {
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
}
export interface PendingCalendarDateRange {
    startCalendarDate?: CalendarDate;
    endCalendarDate?: CalendarDate;
}

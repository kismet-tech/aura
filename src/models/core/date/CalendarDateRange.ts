import { CalendarDate } from "./CalendarDate";

export interface CalendarDateRange {
  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;
}

export interface PendingCalendarDateRange {
  startCalendarDate?: CalendarDate;
  endCalendarDate?: CalendarDate;
}

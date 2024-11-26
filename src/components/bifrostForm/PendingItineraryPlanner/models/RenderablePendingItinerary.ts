import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";

export interface RenderablePendingItinerary {
  itineraryName: string;
  countOfHotelRoomsInItinerary?: number;
  calendarDateRangeInItinerary?: CalendarDateRange;
  itineraryImageUrl: string;

  guestFirstName: string;
}

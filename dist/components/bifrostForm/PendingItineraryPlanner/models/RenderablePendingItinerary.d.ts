import { CalendarDateRange } from "@kismet_ai/foundation";
export interface RenderablePendingItinerary {
    itineraryName: string;
    countOfHotelRoomsInItinerary?: number;
    calendarDateRangeInItinerary?: CalendarDateRange;
    itineraryImageUrl: string;
    guestFirstName: string;
}

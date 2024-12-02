import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";

export interface BifrostGroupBookingCheckoutCart {
  hotelRooms: RenderableItineraryHotelRoomOffer[];
}

export interface BifrostGroupBookingCheckoutSessionSummary {
  hotelName: string;
  groupBookingCheckoutSessionHeroImageUrl: string;
  groupBookingCheckoutSessionTitle: string;
  groupBookingCheckoutSessionCalendarDateRange: CalendarDateRange;
}

export interface BifrostGroupBookingCheckoutStateContextValue {
  cart: BifrostGroupBookingCheckoutCart;
}

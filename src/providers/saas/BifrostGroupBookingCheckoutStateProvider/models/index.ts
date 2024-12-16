import { CalendarDateRange } from "@kismet_ai/foundation";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";

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

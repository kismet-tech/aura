import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";

export interface BifrostGroupBookingCheckoutCart {
  hotelRooms: RenderableItineraryHotelRoomOffer[];
}

export interface BifrostGroupBookingCheckoutStateContextValue {
  cart: BifrostGroupBookingCheckoutCart;
}

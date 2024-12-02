import React from "react";
import { BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutSessionSummary } from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import { RenderableItineraryHotelRoomOffer } from "@/models/RenderableItineraryOffer";
interface BifrostGroupBookingCheckoutRootPageProps {
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
    cart: BifrostGroupBookingCheckoutCart;
    availableHotelRooms: RenderableItineraryHotelRoomOffer[];
}
export declare function BifrostGroupBookingCheckoutRootPage({ checkoutSessionSummary, cart, availableHotelRooms, }: BifrostGroupBookingCheckoutRootPageProps): React.JSX.Element;
export {};

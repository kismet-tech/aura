import React from "react";
import { BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutSessionSummary } from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { AuthenticatedGuestUser } from "@/models/guests/AuthenticatedGuestUser";
interface BifrostGroupBookingCheckoutRootPageProps {
    authenticatedGuestUser: AuthenticatedGuestUser | undefined;
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary | undefined;
    cart: BifrostGroupBookingCheckoutCart;
    availableHotelRooms: RenderableItineraryHotelRoomOffer[];
    onClickLogin: () => void;
    onClickUpdateHotelRoomCountInCart: ({ updatedCountOffered, hotelRoomId, }: {
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
    onClickCheckout: () => void;
}
export declare function BifrostGroupBookingCheckoutRootPage({ authenticatedGuestUser, checkoutSessionSummary, cart, availableHotelRooms, onClickLogin, onClickUpdateHotelRoomCountInCart, onClickCheckout, }: BifrostGroupBookingCheckoutRootPageProps): React.JSX.Element;
export {};

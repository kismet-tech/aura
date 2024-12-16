import React from "react";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
interface BifrostGroupBookingCheckoutBodyProps {
    availableHotelRooms: RenderableItineraryHotelRoomOffer[];
    onClickUpdateHotelRoomCountInCart: ({ updatedCountOffered, hotelRoomOfferId, }: {
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => void;
}
export declare function BifrostGroupBookingCheckoutBody({ availableHotelRooms, onClickUpdateHotelRoomCountInCart, }: BifrostGroupBookingCheckoutBodyProps): React.JSX.Element;
export {};

import React from "react";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
interface BifrostGroupBookingCheckoutBodyProps {
    availableHotelRooms: RenderableItineraryHotelRoomOffer[];
    onClickUpdateHotelRoomCountInCart: ({ updatedCountOffered, hotelRoomId, }: {
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
}
export declare function BifrostGroupBookingCheckoutBody({ availableHotelRooms, onClickUpdateHotelRoomCountInCart, }: BifrostGroupBookingCheckoutBodyProps): React.JSX.Element;
export {};

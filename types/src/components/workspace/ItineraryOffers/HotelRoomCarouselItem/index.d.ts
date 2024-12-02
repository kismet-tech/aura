import React from "react";
import { RenderableItineraryHotelRoomOffer } from "../../../../models/RenderableItineraryOffer";
export interface HotelRoomCarouselItemProps {
    hotelRoomOffer: RenderableItineraryHotelRoomOffer;
    onClick: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
    isCountEditable: boolean;
    onClickUpdateItineraryOfferHotelRoomCount: ({ updatedCountOffered, hotelRoomId, }: {
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
}
export declare function HotelRoomCarouselItem({ hotelRoomOffer, onClick, isCountEditable, onClickUpdateItineraryOfferHotelRoomCount, }: HotelRoomCarouselItemProps): React.JSX.Element;

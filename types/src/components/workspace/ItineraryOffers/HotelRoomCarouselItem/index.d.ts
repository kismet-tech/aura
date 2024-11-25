import React from "react";
import { RenderableItineraryHotelRoomOffer } from "../../../../models/RenderableItineraryOffer";
export interface HotelRoomCarouselItemProps {
    hotelRoomOffer: RenderableItineraryHotelRoomOffer;
    onClick: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
}
export declare function HotelRoomCarouselItem({ hotelRoomOffer, onClick, }: HotelRoomCarouselItemProps): React.JSX.Element;

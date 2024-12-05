import React from "react";
import { RenderableItineraryHotelRoomOffer } from "../../../../models/bifrost/RenderableItineraryOffer";
export declare enum HotelRoomCarouselItemIndicatorLabel {
    COUNT_AVAILABLE_VALUE_ONLY = "COUNT_AVAILABLE_VALUE_ONLY",
    COUNT_REMAINING = "COUNT_REMAINING"
}
export interface HotelRoomCarouselItemProps {
    hotelRoomOffer: RenderableItineraryHotelRoomOffer;
    onClick: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
    hotelRoomCarouselItemIndicatorLabel: HotelRoomCarouselItemIndicatorLabel;
    isCountEditable: boolean;
    onClickUpdateItineraryOfferHotelRoomCount: ({ updatedCountOffered, hotelRoomId, }: {
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
}
export declare function HotelRoomCarouselItem({ hotelRoomOffer, onClick, hotelRoomCarouselItemIndicatorLabel, isCountEditable, onClickUpdateItineraryOfferHotelRoomCount, }: HotelRoomCarouselItemProps): React.JSX.Element;

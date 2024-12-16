import React from "react";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
export declare enum HotelRoomCarouselItemIndicatorLabel {
    COUNT_AVAILABLE_VALUE_ONLY = "COUNT_AVAILABLE_VALUE_ONLY",
    COUNT_REMAINING = "COUNT_REMAINING"
}
export interface HotelRoomCarouselItemProps {
    hotelRoomOffer: RenderableItineraryHotelRoomOffer;
    onClick: ({ hotelRoomOfferId }: {
        hotelRoomOfferId: string;
    }) => void;
    hotelRoomCarouselItemIndicatorLabel: HotelRoomCarouselItemIndicatorLabel;
    isCountEditable: boolean;
    onClickUpdateItineraryOfferHotelRoomCount: ({ updatedCountOffered, hotelRoomOfferId, }: {
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => void;
}
export declare function HotelRoomCarouselItem({ hotelRoomOffer, onClick, hotelRoomCarouselItemIndicatorLabel, isCountEditable, onClickUpdateItineraryOfferHotelRoomCount, }: HotelRoomCarouselItemProps): React.JSX.Element;

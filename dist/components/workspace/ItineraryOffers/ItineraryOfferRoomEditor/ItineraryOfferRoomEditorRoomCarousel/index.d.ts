import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
export interface ItineraryOfferRoomEditorRoomCarouselProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    selectedHotelRoomOfferId: string | undefined;
    setSelectedHotelRoomOfferId: ({ hotelRoomOfferId, }: {
        hotelRoomOfferId: string;
    }) => void;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomOfferId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => void;
    includeAddRoomButton?: boolean;
    onClickAddRoomButton?: () => void;
}
export declare function ItineraryOfferRoomEditorRoomCarousel({ renderableItineraryOffer, setSelectedHotelRoomOfferId, onClickUpdateItineraryOfferHotelRoomCount, includeAddRoomButton, onClickAddRoomButton, }: ItineraryOfferRoomEditorRoomCarouselProps): React.JSX.Element;

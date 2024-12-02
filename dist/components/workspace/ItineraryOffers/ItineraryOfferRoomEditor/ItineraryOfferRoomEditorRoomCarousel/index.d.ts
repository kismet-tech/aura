import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferRoomEditorRoomCarouselProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    selectedHotelRoomId: string | undefined;
    setSelectedHotelRoomId: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
}
export declare function ItineraryOfferRoomEditorRoomCarousel({ renderableItineraryOffer, setSelectedHotelRoomId, onClickUpdateItineraryOfferHotelRoomCount, }: ItineraryOfferRoomEditorRoomCarouselProps): React.JSX.Element;

import { RenderableItineraryOffer } from "../../../../models/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferRoomEditorRoomCarouselProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    selectedHotelRoomId: string | undefined;
    setSelectedHotelRoomId: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
}
export declare function ItineraryOfferRoomEditorRoomCarousel({ renderableItineraryOffer, setSelectedHotelRoomId, }: ItineraryOfferRoomEditorRoomCarouselProps): React.JSX.Element;

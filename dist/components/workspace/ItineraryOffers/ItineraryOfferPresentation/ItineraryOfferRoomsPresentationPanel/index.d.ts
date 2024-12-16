import React from "react";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface ItineraryOfferRoomsPresentationPanelProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    onClickHotelRoomCarouselItem: ({ hotelRoomOfferId, }: {
        hotelRoomOfferId: string;
    }) => void;
}
export declare function ItineraryOfferRoomsPresentationPanel({ renderableItineraryOffer, onClickHotelRoomCarouselItem, }: ItineraryOfferRoomsPresentationPanelProps): React.JSX.Element;

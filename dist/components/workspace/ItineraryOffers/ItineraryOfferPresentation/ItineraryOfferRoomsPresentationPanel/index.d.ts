import React from "react";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
export interface ItineraryOfferRoomsPresentationPanelProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    onClickHotelRoomCarouselItem: ({ hotelRoomId, }: {
        hotelRoomId: string;
    }) => void;
}
export declare function ItineraryOfferRoomsPresentationPanel({ renderableItineraryOffer, onClickHotelRoomCarouselItem, }: ItineraryOfferRoomsPresentationPanelProps): React.JSX.Element;

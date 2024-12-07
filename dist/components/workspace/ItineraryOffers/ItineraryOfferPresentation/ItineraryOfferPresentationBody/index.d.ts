import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferPresentationBodyProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onClickHotelRoom: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
}
export declare function ItineraryOfferPresentationBody({ itineraryOfferId, renderableItineraryOffers, onClickHotelRoom, }: ItineraryOfferPresentationBodyProps): React.JSX.Element;

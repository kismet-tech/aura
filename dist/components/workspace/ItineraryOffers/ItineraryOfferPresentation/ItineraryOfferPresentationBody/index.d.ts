import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
export interface ItineraryOfferPresentationBodyProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onClickHotelRoom: ({ hotelRoomOfferId, }: {
        hotelRoomOfferId: string;
    }) => void;
}
export declare function ItineraryOfferPresentationBody({ itineraryOfferId, renderableItineraryOffers, onClickHotelRoom, }: ItineraryOfferPresentationBodyProps): React.JSX.Element;

import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
export interface ItineraryOfferPresentationProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onSelectAlternativeItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
    onClickHotelRoom: ({ hotelRoomOfferId, }: {
        hotelRoomOfferId: string;
    }) => void;
    onClickSelectItineraryOfferAndGoToPaymentsPage: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function ItineraryOfferPresentation({ itineraryOfferId, renderableItineraryOffers, onSelectAlternativeItineraryOffer, onClickHotelRoom, onClickSelectItineraryOfferAndGoToPaymentsPage, }: ItineraryOfferPresentationProps): React.JSX.Element;

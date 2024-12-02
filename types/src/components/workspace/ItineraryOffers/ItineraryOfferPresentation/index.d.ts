import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferPresentationProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onSelectAlternativeItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
    onClickHotelRoom: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
    onClickGoToPaymentsPage: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function ItineraryOfferPresentation({ itineraryOfferId, renderableItineraryOffers, onSelectAlternativeItineraryOffer, onClickHotelRoom, onClickGoToPaymentsPage, }: ItineraryOfferPresentationProps): React.JSX.Element;

import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
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
    onClickSelectItineraryOfferAndGoToPaymentsPage: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function ItineraryOfferPresentation({ itineraryOfferId, renderableItineraryOffers, onSelectAlternativeItineraryOffer, onClickHotelRoom, onClickSelectItineraryOfferAndGoToPaymentsPage, }: ItineraryOfferPresentationProps): React.JSX.Element;

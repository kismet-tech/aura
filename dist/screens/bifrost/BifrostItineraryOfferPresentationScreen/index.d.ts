import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
export interface BifrostItineraryOfferPresentationScreenProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    renderablePendingItinerary: RenderablePendingItinerary;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
    onClickSelectItineraryOfferAndGoToPaymentsPage: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function BifrostItineraryOfferPresentationScreen({ renderableItineraryOffers, renderablePendingItinerary, onClickUpdateItineraryOfferHotelRoomCount, onClickSelectItineraryOfferAndGoToPaymentsPage, }: BifrostItineraryOfferPresentationScreenProps): React.JSX.Element;

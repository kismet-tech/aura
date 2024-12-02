import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
export interface BifrostItineraryOfferPresentationScreenProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    renderablePendingItinerary: RenderablePendingItinerary;
    paymentsPageUrl: string;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
}
export declare function BifrostItineraryOfferPresentationScreen({ renderableItineraryOffers, renderablePendingItinerary, paymentsPageUrl, onClickUpdateItineraryOfferHotelRoomCount, }: BifrostItineraryOfferPresentationScreenProps): React.JSX.Element;

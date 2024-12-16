import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
export interface BifrostItineraryOfferPresentationScreenProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    renderablePendingItinerary: RenderablePendingItinerary;
    onClickUpdateItineraryOfferHotelRoomCount: ({ itineraryOfferId, updatedCountOffered, hotelRoomOfferId, }: {
        itineraryOfferId: string;
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
    onClickSelectItineraryOfferAndGoToPaymentsPage: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function BifrostItineraryOfferPresentationScreen({ renderableItineraryOffers, renderablePendingItinerary, onClickUpdateItineraryOfferHotelRoomCount, onClickSelectItineraryOfferAndGoToPaymentsPage, }: BifrostItineraryOfferPresentationScreenProps): React.JSX.Element;

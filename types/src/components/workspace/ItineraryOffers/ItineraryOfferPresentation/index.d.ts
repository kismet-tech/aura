import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferPresentationProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onSelectAlternativeItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function ItineraryOfferPresentation({ itineraryOfferId, renderableItineraryOffers, onSelectAlternativeItineraryOffer, }: ItineraryOfferPresentationProps): React.JSX.Element;

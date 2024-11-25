import React from "react";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
export interface AlternativeItineraryOfferSelectorProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    onSelectAlternativeItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function AlternativeItineraryOfferSelector({ renderableItineraryOffers, onSelectAlternativeItineraryOffer, }: AlternativeItineraryOfferSelectorProps): React.JSX.Element;

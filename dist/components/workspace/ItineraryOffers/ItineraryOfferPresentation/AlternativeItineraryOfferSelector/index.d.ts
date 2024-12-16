import React from "react";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface AlternativeItineraryOfferSelectorProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
    onSelectAlternativeItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => void;
}
export declare function AlternativeItineraryOfferSelector({ renderableItineraryOffers, onSelectAlternativeItineraryOffer, }: AlternativeItineraryOfferSelectorProps): React.JSX.Element;

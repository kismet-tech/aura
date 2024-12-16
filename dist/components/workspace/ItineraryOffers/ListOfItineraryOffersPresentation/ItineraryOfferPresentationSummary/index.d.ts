import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
export interface ItineraryOfferPresentationSummaryProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    itineraryOfferIndex: number;
    onClick: () => void;
}
export declare function ItineraryOfferPresentationSummary({ renderableItineraryOffer, itineraryOfferIndex, onClick, }: ItineraryOfferPresentationSummaryProps): React.JSX.Element;

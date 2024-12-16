import React from "react";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface ItineraryOfferPresentationHeaderProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    itineraryOfferIndex: number;
}
export declare function ItineraryOfferPresentationHeader({ renderableItineraryOffer, itineraryOfferIndex, }: ItineraryOfferPresentationHeaderProps): React.JSX.Element;

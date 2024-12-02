import React from "react";
import { RenderableItineraryOffer } from "../../../../../models/bifrost/RenderableItineraryOffer";
export interface ItineraryOfferPresentationHeaderProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    itineraryOfferIndex: number;
}
export declare function ItineraryOfferPresentationHeader({ renderableItineraryOffer, itineraryOfferIndex, }: ItineraryOfferPresentationHeaderProps): React.JSX.Element;

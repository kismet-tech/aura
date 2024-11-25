import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
export interface ItineraryOfferPresentationBodyProps {
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
}
export declare function ItineraryOfferPresentationBody({ itineraryOfferId, renderableItineraryOffers, }: ItineraryOfferPresentationBodyProps): React.JSX.Element;

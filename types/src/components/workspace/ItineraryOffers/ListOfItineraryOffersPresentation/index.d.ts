import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
export interface ListOfItineraryOffersPresentationProps {
    renderableItineraryOffers: RenderableItineraryOffer[];
}
export declare function ListOfItineraryOffersPresentation({ renderableItineraryOffers, }: ListOfItineraryOffersPresentationProps): React.JSX.Element[];

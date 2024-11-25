import React from "react";
import { RenderablePendingItinerary } from "./models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
export interface PendingItineraryPlannerProps {
    renderablePendingItinerary: RenderablePendingItinerary;
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
}
export declare function PendingItineraryPlanner({ renderablePendingItinerary, itineraryOfferId, renderableItineraryOffers, }: PendingItineraryPlannerProps): React.JSX.Element;

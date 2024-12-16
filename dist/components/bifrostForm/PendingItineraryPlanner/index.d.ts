import React from "react";
import { RenderablePendingItinerary } from "./models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
export interface PendingItineraryPlannerProps {
    renderablePendingItinerary: RenderablePendingItinerary;
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onClickHotelRoom: ({ hotelRoomOfferId, }: {
        hotelRoomOfferId: string;
    }) => void;
}
export declare function PendingItineraryPlanner({ renderablePendingItinerary, itineraryOfferId, renderableItineraryOffers, onClickHotelRoom, }: PendingItineraryPlannerProps): React.JSX.Element;

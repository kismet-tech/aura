import React from "react";
import { RenderablePendingItinerary } from "./models/RenderablePendingItinerary";
import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
export interface PendingItineraryPlannerProps {
    renderablePendingItinerary: RenderablePendingItinerary;
    itineraryOfferId: string;
    renderableItineraryOffers: RenderableItineraryOffer[];
    onClickHotelRoom: ({ hotelRoomId }: {
        hotelRoomId: string;
    }) => void;
}
export declare function PendingItineraryPlanner({ renderablePendingItinerary, itineraryOfferId, renderableItineraryOffers, onClickHotelRoom, }: PendingItineraryPlannerProps): React.JSX.Element;

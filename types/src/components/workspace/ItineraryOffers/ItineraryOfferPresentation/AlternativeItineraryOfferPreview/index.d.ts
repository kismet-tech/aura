import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
export interface AlternativeItineraryOfferPreviewProps {
    renderableItineraryOffer: RenderableItineraryOffer;
    itineraryOfferIndex: number;
    onClick: () => void;
}
export declare function AlternativeItineraryOfferPreview({ renderableItineraryOffer, itineraryOfferIndex, onClick, }: AlternativeItineraryOfferPreviewProps): React.JSX.Element;

import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
import { ItineraryOfferPresentationSummary } from "./ItineraryOfferPresentationSummary";

export interface ListOfItineraryOffersPresentationProps {
  renderableItineraryOffers: RenderableItineraryOffer[];
}

export function ListOfItineraryOffersPresentation({
  renderableItineraryOffers,
}: ListOfItineraryOffersPresentationProps) {
  return renderableItineraryOffers.map(
    (
      renderableItineraryOffer: RenderableItineraryOffer,
      itineraryOfferIndex: number
    ) => {
      return (
        <div className="mb-2 border border-[#D6D6D6]">
          <ItineraryOfferPresentationSummary
            renderableItineraryOffer={renderableItineraryOffer}
            itineraryOfferIndex={itineraryOfferIndex}
            onClick={() => {}}
          />
        </div>
      );
    }
  );
}

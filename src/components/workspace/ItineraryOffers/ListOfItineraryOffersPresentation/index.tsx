import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
import { ItineraryOfferPresentationSummary } from "./ItineraryOfferPresentationSummary";

export interface ListOfItineraryOffersPresentationProps {
  renderableItineraryOffers: RenderableItineraryOffer[];
  onClick: ({ itineraryOfferId }: { itineraryOfferId: string }) => void;
}

export function ListOfItineraryOffersPresentation({
  renderableItineraryOffers,
  onClick,
}: ListOfItineraryOffersPresentationProps): JSX.Element {
  return (
    <>
      {renderableItineraryOffers.map(
        (
          renderableItineraryOffer: RenderableItineraryOffer,
          itineraryOfferIndex: number
        ) => {
          return (
            <div
              className="mb-2 border border-[#D6D6D6]"
              key={renderableItineraryOffer.itineraryOfferId}
            >
              <ItineraryOfferPresentationSummary
                renderableItineraryOffer={renderableItineraryOffer}
                itineraryOfferIndex={itineraryOfferIndex}
                onClick={() => {
                  onClick({
                    itineraryOfferId: renderableItineraryOffer.itineraryOfferId,
                  });
                }}
              />
            </div>
          );
        }
      )}
    </>
  );
}

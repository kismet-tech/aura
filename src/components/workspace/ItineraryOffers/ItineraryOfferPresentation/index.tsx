import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import React from "react";
import { AlternativeItineraryOfferSelector } from "./AlternativeItineraryOfferSelector";
import { ItineraryOfferPresentationBody } from "./ItineraryOfferPresentationBody";

export interface ItineraryOfferPresentationProps {
  itineraryOfferId: string;
  renderableItineraryOffers: RenderableItineraryOffer[];
  onSelectAlternativeItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => void;
}

export function ItineraryOfferPresentation({
  itineraryOfferId,
  renderableItineraryOffers,
  onSelectAlternativeItineraryOffer,
}: ItineraryOfferPresentationProps) {
  const renderableItineraryOffer = renderableItineraryOffers.find(
    (offer) => offer.itineraryOfferId === itineraryOfferId
  );

  if (!renderableItineraryOffer) {
    return <></>;
  }

  const { itineraryOfferName } = renderableItineraryOffer;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-0">{itineraryOfferName}</h2>
      <AlternativeItineraryOfferSelector
        renderableItineraryOffers={renderableItineraryOffers}
        onSelectAlternativeItineraryOffer={onSelectAlternativeItineraryOffer}
      />
      <ItineraryOfferPresentationBody
        itineraryOfferId={itineraryOfferId}
        renderableItineraryOffers={renderableItineraryOffers}
      />
    </div>
  );
}

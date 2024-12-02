import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
import { ItineraryOfferPresentationHeader } from "../ItineraryOfferPresentationHeader";
import { ItineraryOfferRoomsPresentationPanel } from "../ItineraryOfferRoomsPresentationPanel";
import { ItineraryOfferEventsPresentationPanel } from "../ItineraryOfferEventsPresentationPanel";

export interface ItineraryOfferPresentationBodyProps {
  itineraryOfferId: string;
  renderableItineraryOffers: RenderableItineraryOffer[];
  onClickHotelRoom: ({ hotelRoomId }: { hotelRoomId: string }) => void;
}

export function ItineraryOfferPresentationBody({
  itineraryOfferId,
  renderableItineraryOffers,
  onClickHotelRoom,
}: ItineraryOfferPresentationBodyProps) {
  const renderableItineraryOffer = renderableItineraryOffers.find(
    (offer) => offer.itineraryOfferId === itineraryOfferId
  );

  if (!renderableItineraryOffer) {
    return <></>;
  }
  const itineraryOfferIndex = renderableItineraryOffers.indexOf(
    renderableItineraryOffer
  );

  return (
    <div>
      <ItineraryOfferPresentationHeader
        itineraryOfferIndex={itineraryOfferIndex}
        renderableItineraryOffer={renderableItineraryOffer}
      />
      <div className="pt-4">
        <ItineraryOfferRoomsPresentationPanel
          renderableItineraryOffer={renderableItineraryOffer}
          onClickHotelRoomCarouselItem={onClickHotelRoom}
        />
        <ItineraryOfferEventsPresentationPanel
          renderableItineraryOffer={renderableItineraryOffer}
        />
      </div>
    </div>
  );
}

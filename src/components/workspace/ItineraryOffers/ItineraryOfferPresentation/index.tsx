import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React from "react";
import { AlternativeItineraryOfferSelector } from "./AlternativeItineraryOfferSelector";
import { ItineraryOfferPresentationBody } from "./ItineraryOfferPresentationBody";
import { NavigationButton } from "@/components/atoms/NavigationButton";

export interface ItineraryOfferPresentationProps {
  itineraryOfferId: string;
  renderableItineraryOffers: RenderableItineraryOffer[];
  onSelectAlternativeItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => void;
  onClickHotelRoom: ({
    hotelRoomOfferId,
  }: {
    hotelRoomOfferId: string;
  }) => void;
  onClickSelectItineraryOfferAndGoToPaymentsPage: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => void;
}

export function ItineraryOfferPresentation({
  itineraryOfferId,
  renderableItineraryOffers,
  onSelectAlternativeItineraryOffer,
  onClickHotelRoom,
  onClickSelectItineraryOfferAndGoToPaymentsPage,
}: ItineraryOfferPresentationProps) {
  const renderableItineraryOffer = renderableItineraryOffers.find(
    (offer) => offer.itineraryOfferId === itineraryOfferId
  );

  if (!renderableItineraryOffer) {
    return <></>;
  }

  const { itineraryOfferName } = renderableItineraryOffer;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-lg font-semibold mb-0">{itineraryOfferName}</h2>
        <div className="h-32">
          <AlternativeItineraryOfferSelector
            renderableItineraryOffers={renderableItineraryOffers}
            onSelectAlternativeItineraryOffer={
              onSelectAlternativeItineraryOffer
            }
          />
        </div>
        <ItineraryOfferPresentationBody
          itineraryOfferId={itineraryOfferId}
          renderableItineraryOffers={renderableItineraryOffers}
          onClickHotelRoom={onClickHotelRoom}
        />
      </div>
      <div className="flex-shrink-0">
        <div className="flex">
          <NavigationButton
            onClickMoveForward={() =>
              onClickSelectItineraryOfferAndGoToPaymentsPage({
                itineraryOfferId,
              })
            }
            isEnabled={true}
            moveForwardChildren={<>Place hold {">"}</>}
          />
        </div>
      </div>
    </div>
  );
}

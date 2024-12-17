import { BifrostInquirySubmittedIndicator } from "@/components/bifrostForm/BifrostInquirySubmittedIndicator";
import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { ItineraryOfferPresentation } from "@/components/workspace/ItineraryOffers/ItineraryOfferPresentation";
import { ItineraryOfferRoomEditor } from "@/components/workspace/ItineraryOffers/ItineraryOfferRoomEditor";
import { ListOfItineraryOffersPresentation } from "@/components/workspace/ItineraryOffers/ListOfItineraryOffersPresentation";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import React, { useState } from "react";

export interface BifrostItineraryOfferPresentationScreenProps {
  renderableItineraryOffers?: RenderableItineraryOffer[];
  renderablePendingItinerary: RenderablePendingItinerary;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => Promise<{ updatedItineraryOfferId: string }>;
  onClickSelectItineraryOfferAndGoToPaymentsPage: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => void;
}

enum BifrostItineraryOfferPresentationScreenType {
  LIST_OF_ITINERARY_OFFERS_PRESENTATION = "LIST_OF_ITINERARY_OFFERS_PRESENTATION",
  ITINERARY_OFFER_PRESENTATION = "ITINERARY_OFFER_PRESENTATION",
  ITINERARY_OFFER_ROOM_EDITOR = "ITINERARY_OFFER_ROOM_EDITOR",
}

export function BifrostItineraryOfferPresentationScreen({
  renderableItineraryOffers,
  renderablePendingItinerary,
  onClickUpdateItineraryOfferHotelRoomCount,
  onClickSelectItineraryOfferAndGoToPaymentsPage,
}: BifrostItineraryOfferPresentationScreenProps) {
  const [
    bifrostItineraryOfferPresentationScreenType,
    setBifrostItineraryOfferPresentationScreenType,
  ] = useState<BifrostItineraryOfferPresentationScreenType>(
    BifrostItineraryOfferPresentationScreenType.LIST_OF_ITINERARY_OFFERS_PRESENTATION
  );

  const [selectedItineraryOfferId, setSelectedItineraryOfferId] = useState<
    string | undefined
  >(undefined);

  let renderedScreen: JSX.Element = <></>;

  if (
    bifrostItineraryOfferPresentationScreenType ===
    BifrostItineraryOfferPresentationScreenType.LIST_OF_ITINERARY_OFFERS_PRESENTATION
  ) {
    renderedScreen = (
      <div>
        <div className="sticky top-0 z-10 bg-white pb-4 flex-shrink-0">
          <PendingItineraryPlannerHeader
            renderablePendingItinerary={renderablePendingItinerary}
          />
        </div>
        <div>
          <BifrostInquirySubmittedIndicator assignedSalesAgentName={"Jason"} />
          <ListOfItineraryOffersPresentation
            renderableItineraryOffers={renderableItineraryOffers}
            onClick={({ itineraryOfferId }: { itineraryOfferId: string }) => {
              console.log(`itineraryOfferId: ${itineraryOfferId}`);
              setBifrostItineraryOfferPresentationScreenType(
                BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_PRESENTATION
              );
              setSelectedItineraryOfferId(itineraryOfferId);
            }}
          />
        </div>
      </div>
    );
  } else if (
    bifrostItineraryOfferPresentationScreenType ===
    BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_PRESENTATION
  ) {
    renderedScreen = (
      <ItineraryOfferPresentation
        itineraryOfferId={selectedItineraryOfferId as string}
        renderableItineraryOffers={renderableItineraryOffers}
        onSelectAlternativeItineraryOffer={({
          itineraryOfferId,
        }: {
          itineraryOfferId: string;
        }): void => {
          setSelectedItineraryOfferId(itineraryOfferId);
        }}
        onClickHotelRoom={({}: { hotelRoomOfferId: string }): void => {
          setBifrostItineraryOfferPresentationScreenType(
            BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_ROOM_EDITOR
          );
        }}
        onClickSelectItineraryOfferAndGoToPaymentsPage={
          onClickSelectItineraryOfferAndGoToPaymentsPage
        }
      />
    );
  } else if (
    bifrostItineraryOfferPresentationScreenType ===
    BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_ROOM_EDITOR
  ) {
    const renderableItineraryOffer = renderableItineraryOffers.find(
      (renderableItineraryOfferElement: RenderableItineraryOffer) => {
        return (
          renderableItineraryOfferElement.itineraryOfferId ===
          selectedItineraryOfferId
        );
      }
    ) as RenderableItineraryOffer;

    renderedScreen = (
      <ItineraryOfferRoomEditor
        renderableItineraryOffer={renderableItineraryOffer}
        onClickUpdateItineraryOfferHotelRoomCount={async ({
          itineraryOfferId,
          updatedCountOffered,
          hotelRoomOfferId,
        }: {
          itineraryOfferId: string;
          updatedCountOffered: number;
          hotelRoomOfferId: string;
        }): Promise<void> => {
          const { updatedItineraryOfferId } =
            await onClickUpdateItineraryOfferHotelRoomCount({
              itineraryOfferId,
              updatedCountOffered,
              hotelRoomOfferId,
            });

          setSelectedItineraryOfferId(updatedItineraryOfferId);
        }}
        onClickExit={(): void => {
          setBifrostItineraryOfferPresentationScreenType(
            BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_PRESENTATION
          );
        }}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden bg-white p-4">
      <div className="flex-grow overflow-y-auto min-h-0">{renderedScreen}</div>
    </div>
  );
}

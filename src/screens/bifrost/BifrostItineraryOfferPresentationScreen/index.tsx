import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { ItineraryOfferPresentation } from "@/components/workspace/ItineraryOffers/ItineraryOfferPresentation";
import { ItineraryOfferRoomEditor } from "@/components/workspace/ItineraryOffers/ItineraryOfferRoomEditor";
import { ListOfItineraryOffersPresentation } from "@/components/workspace/ItineraryOffers/ListOfItineraryOffersPresentation";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import React, { ReactNode, useState } from "react";

export interface BifrostItineraryOfferPresentationScreenProps {
  renderableItineraryOffers: RenderableItineraryOffer[];
  renderablePendingItinerary: RenderablePendingItinerary;
  paymentsPageUrl: string;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomId: string;
  }) => Promise<{ updatedItineraryOfferId: string }>;
}

enum BifrostItineraryOfferPresentationScreenType {
  LIST_OF_ITINERARY_OFFERS_PRESENTATION = "LIST_OF_ITINERARY_OFFERS_PRESENTATION",
  ITINERARY_OFFER_PRESENTATION = "ITINERARY_OFFER_PRESENTATION",
  ITINERARY_OFFER_ROOM_EDITOR = "ITINERARY_OFFER_ROOM_EDITOR",
}

export function BifrostItineraryOfferPresentationScreen({
  renderableItineraryOffers,
  renderablePendingItinerary,
  paymentsPageUrl,
  onClickUpdateItineraryOfferHotelRoomCount,
}: BifrostItineraryOfferPresentationScreenProps) {
  const onClickGoToPaymentsPage = ({}: { itineraryOfferId: string }) => {
    window.location.href = paymentsPageUrl;
  };

  // console.log(`\n\n\nUPDATED renderableItineraryOffers`);
  // console.log(JSON.stringify(renderableItineraryOffers, null, 4));

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
          <div>
            Thank you for submitting your inquiry. Someone will be in touch
            soon. The follow options are available for instant booking. The
            itinerary and booking options have been emailed to you.
          </div>
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
        onClickHotelRoom={({}: { hotelRoomId: string }): void => {
          setBifrostItineraryOfferPresentationScreenType(
            BifrostItineraryOfferPresentationScreenType.ITINERARY_OFFER_ROOM_EDITOR
          );
        }}
        onClickGoToPaymentsPage={onClickGoToPaymentsPage}
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
          hotelRoomId,
        }: {
          itineraryOfferId: string;
          updatedCountOffered: number;
          hotelRoomId: string;
        }): Promise<void> => {
          const { updatedItineraryOfferId } =
            await onClickUpdateItineraryOfferHotelRoomCount({
              itineraryOfferId,
              updatedCountOffered,
              hotelRoomId,
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

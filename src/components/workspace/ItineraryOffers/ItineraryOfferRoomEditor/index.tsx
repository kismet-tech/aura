import { useState } from "react";
import { Settings2, X } from "lucide-react";
import React from "react";
import { KismetHeader, KismetSectionHeader } from "../../../atoms";
import { ItineraryOfferRoomEditorRoomDetailsImageList } from "./ItineraryOfferRoomEditorRoomDetailsImageList";
import { ItineraryOfferRoomEditorRoomCarousel } from "./ItineraryOfferRoomEditorRoomCarousel";
import { ItineraryOfferRoomEditorRoomDetails } from "./ItineraryOfferRoomEditorRoomDetails";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";

export interface ItineraryOfferRoomEditorProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;

  onClickExit: () => void;
}

export function ItineraryOfferRoomEditor({
  renderableItineraryOffer,
  onClickUpdateItineraryOfferHotelRoomCount,
  onClickExit,
}: ItineraryOfferRoomEditorProps): JSX.Element {
  const [selectedHotelRoomOfferId, setSelectedHotelRoomOfferId] = useState<
    string | undefined
  >(undefined);

  let RenderedSelectedHotelRoomDetails: JSX.Element = <></>;
  if (selectedHotelRoomOfferId) {
    const renderableItineraryHotelRoomOffer =
      renderableItineraryOffer.hotelRoomOffers.find(
        (offer) => offer.hotelRoomOfferId === selectedHotelRoomOfferId
      );

    if (renderableItineraryHotelRoomOffer) {
      RenderedSelectedHotelRoomDetails = (
        <>
          <ItineraryOfferRoomEditorRoomDetailsImageList
            renderableItineraryHotelRoomOffer={
              renderableItineraryHotelRoomOffer
            }
          />
          <ItineraryOfferRoomEditorRoomDetails
            renderableItineraryHotelRoomOffer={
              renderableItineraryHotelRoomOffer
            }
          />
        </>
      );
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <KismetHeader>Edit Rooms</KismetHeader>
        <X className="cursor-pointer" onClick={onClickExit} />
      </div>
      <div>Please edit and add additional rooms you want to make bookable.</div>
      <div className="pt-5">
        <KismetSectionHeader>
          <div className="flex items-center space-x-2">
            Rooms <Settings2 className="w-5 h-5" />
          </div>
        </KismetSectionHeader>
        <div>{renderableItineraryOffer.itineraryOfferDescription}</div>
      </div>
      <ItineraryOfferRoomEditorRoomCarousel
        renderableItineraryOffer={renderableItineraryOffer}
        selectedHotelRoomOfferId={selectedHotelRoomOfferId}
        setSelectedHotelRoomOfferId={({
          hotelRoomOfferId,
        }: {
          hotelRoomOfferId: string;
        }) => {
          setSelectedHotelRoomOfferId(hotelRoomOfferId);
        }}
        onClickUpdateItineraryOfferHotelRoomCount={
          onClickUpdateItineraryOfferHotelRoomCount
        }
      />

      {RenderedSelectedHotelRoomDetails}
    </div>
  );
}

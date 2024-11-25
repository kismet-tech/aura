import { useState } from "react";
import { Settings2 } from "lucide-react";
import React from "react";
import { RenderableItineraryOffer } from "../../../../models/RenderableItineraryOffer";
import { KismetHeader, KismetSectionHeader } from "../../../atoms";
import { ItineraryOfferRoomEditorRoomDetailsImageList } from "./ItineraryOfferRoomEditorRoomDetailsImageList";
import { ItineraryOfferRoomEditorRoomCarousel } from "./ItineraryOfferRoomEditorRoomCarousel";
import { ItineraryOfferRoomEditorRoomDetails } from "./ItineraryOfferRoomEditorRoomDetails";

export interface ItineraryOfferRoomEditorProps {
  renderableItineraryOffer: RenderableItineraryOffer;
}

export function ItineraryOfferRoomEditor({
  renderableItineraryOffer,
}: ItineraryOfferRoomEditorProps) {
  const [selectedHotelRoomId, setSelectedHotelRoomId] = useState<
    string | undefined
  >(undefined);

  let RenderedSelectedHotelRoomDetails: JSX.Element = <></>;
  if (selectedHotelRoomId) {
    const renderableItineraryHotelRoomOffer =
      renderableItineraryOffer.hotelRoomOffers.find(
        (offer) => offer.hotelRoomId === selectedHotelRoomId
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
      <KismetHeader>Edit Rooms</KismetHeader>
      <div>
        Please edit and add additional rooms you want to make bookable in your
        wedding bloc below.
      </div>
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
        selectedHotelRoomId={selectedHotelRoomId}
        setSelectedHotelRoomId={({ hotelRoomId }: { hotelRoomId: string }) => {
          setSelectedHotelRoomId(hotelRoomId);
        }}
      />

      {RenderedSelectedHotelRoomDetails}
    </div>
  );

  return;
}

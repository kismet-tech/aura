import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import {
  RenderableItineraryHotelRoomOffer,
  renderDiscount,
} from "@kismet_ai/foundation";
import React from "react";

export interface ItineraryOfferRoomEditorRoomDetailsProps {
  renderableItineraryHotelRoomOffer: RenderableItineraryHotelRoomOffer;
}

export function ItineraryOfferRoomEditorRoomDetails({
  renderableItineraryHotelRoomOffer,
}: ItineraryOfferRoomEditorRoomDetailsProps) {
  const listPrice = Math.round(
    renderableItineraryHotelRoomOffer.listPriceInCents / 100
  );
  const offerPrice = Math.round(
    renderableItineraryHotelRoomOffer.offerPriceInCents / 100
  );

  const renderedDiscount = renderDiscount({
    listPriceInCents: renderableItineraryHotelRoomOffer.listPriceInCents,
    offerPriceInCents: renderableItineraryHotelRoomOffer.offerPriceInCents,
  });

  return (
    <div>
      <KismetSectionHeader>
        <div className="flex">
          {renderableItineraryHotelRoomOffer.hotelRoomName}
        </div>
      </KismetSectionHeader>

      <div>
        <span className="text-gray-500 line-through mr-2">${listPrice}</span>
        <span className="text-black font-semibold">${offerPrice}</span>

        {renderedDiscount.length > 0 ? ` (${renderedDiscount})` : ""}
      </div>
      <div>{renderableItineraryHotelRoomOffer.hotelRoomDescription}</div>
    </div>
  );
}

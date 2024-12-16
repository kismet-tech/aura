import React from "react";
import { ScrollArea, ScrollBar } from "@/components/shadcn/scroll-area";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";

export interface ItineraryOfferRoomEditorRoomDetailsImageListProps {
  renderableItineraryHotelRoomOffer: RenderableItineraryHotelRoomOffer;
}

export function ItineraryOfferRoomEditorRoomDetailsImageList({
  renderableItineraryHotelRoomOffer,
}: ItineraryOfferRoomEditorRoomDetailsImageListProps) {
  return (
    <ScrollArea className="w-full rounded-md overflow-hidden">
      <div className="flex space-x-4 p-4">
        {renderableItineraryHotelRoomOffer.hotelRoomImageUrls.map(
          (imageUrl: string, index: number) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Hotel Room ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

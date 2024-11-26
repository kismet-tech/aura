import { Settings2 } from "lucide-react";

import React from "react";
import { KismetSectionHeader } from "@/components/atoms";
import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryHotelRoomOffer,
} from "@/models/RenderableItineraryOffer";
import { HotelRoomCarouselItem } from "../../HotelRoomCarouselItem";

export interface ItineraryOfferRoomsPresentationPanelProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  onClickHotelRoomCarouselItem: ({
    hotelRoomId,
  }: {
    hotelRoomId: string;
  }) => void;
}

export function ItineraryOfferRoomsPresentationPanel({
  renderableItineraryOffer,
  onClickHotelRoomCarouselItem,
}: ItineraryOfferRoomsPresentationPanelProps) {
  const hotelRoomOffers: RenderableItineraryHotelRoomOffer[] =
    renderableItineraryOffer.hotelRoomOffers;

  return (
    <div>
      <KismetSectionHeader>
        <div className="flex items-center space-x-2">
          Rooms <Settings2 className="w-5 h-5" />
        </div>
      </KismetSectionHeader>
      <p className="text-sm text-gray-600 mt-0">
        {renderableItineraryOffer.descriptionOfAllHotelRoomOffers &&
        renderableItineraryOffer.descriptionOfAllHotelRoomOffers.length > 0
          ? renderableItineraryOffer.descriptionOfAllHotelRoomOffers
          : "Add specific rooms to your package"}
      </p>

      <Carousel
        spaceBetween={-40}
        items={hotelRoomOffers}
        renderItem={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
          return (
            <HotelRoomCarouselItem
              hotelRoomOffer={hotelRoomOffer}
              onClick={({ hotelRoomId }: { hotelRoomId: string }) =>
                onClickHotelRoomCarouselItem({ hotelRoomId })
              }
            />
          );
        }}
        itemKey={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) =>
          hotelRoomOffer.hotelRoomId
        }
        interItemComponent={<></>}
      />
    </div>
  );
}

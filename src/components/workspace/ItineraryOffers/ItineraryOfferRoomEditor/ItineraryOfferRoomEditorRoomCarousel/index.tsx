import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryHotelRoomOffer,
} from "@/models/RenderableItineraryOffer";
import React from "react";
import { HotelRoomCarouselItem } from "../../HotelRoomCarouselItem";

export interface ItineraryOfferRoomEditorRoomCarouselProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  selectedHotelRoomId: string | undefined;
  setSelectedHotelRoomId: ({ hotelRoomId }: { hotelRoomId: string }) => void;
}

export function ItineraryOfferRoomEditorRoomCarousel({
  renderableItineraryOffer,
  setSelectedHotelRoomId,
}: ItineraryOfferRoomEditorRoomCarouselProps) {
  return (
    <Carousel
      spaceBetween={-40}
      items={renderableItineraryOffer.hotelRoomOffers}
      renderItem={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
        return (
          <HotelRoomCarouselItem
            hotelRoomOffer={hotelRoomOffer}
            onClick={() =>
              setSelectedHotelRoomId({
                hotelRoomId: hotelRoomOffer.hotelRoomId,
              })
            }
          />
        );
      }}
      itemKey={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) =>
        hotelRoomOffer.hotelRoomId
      }
      interItemComponent={<></>}
    />
  );
}

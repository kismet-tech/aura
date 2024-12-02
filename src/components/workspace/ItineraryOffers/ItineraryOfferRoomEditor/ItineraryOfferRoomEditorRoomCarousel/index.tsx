import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryHotelRoomOffer,
} from "@/models/bifrost/RenderableItineraryOffer";
import React from "react";
import { HotelRoomCarouselItem } from "../../HotelRoomCarouselItem";

export interface ItineraryOfferRoomEditorRoomCarouselProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  selectedHotelRoomId: string | undefined;
  setSelectedHotelRoomId: ({ hotelRoomId }: { hotelRoomId: string }) => void;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomId: string;
  }) => void;
}

export function ItineraryOfferRoomEditorRoomCarousel({
  renderableItineraryOffer,
  setSelectedHotelRoomId,
  onClickUpdateItineraryOfferHotelRoomCount,
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
            isCountEditable={true}
            onClickUpdateItineraryOfferHotelRoomCount={({
              updatedCountOffered,
              hotelRoomId,
            }: {
              updatedCountOffered: number;
              hotelRoomId: string;
            }) => {
              onClickUpdateItineraryOfferHotelRoomCount({
                itineraryOfferId: renderableItineraryOffer.itineraryOfferId,
                updatedCountOffered,
                hotelRoomId,
              });
            }}
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

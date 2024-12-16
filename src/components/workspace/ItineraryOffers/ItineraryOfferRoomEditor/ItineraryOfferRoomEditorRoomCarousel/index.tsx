import { Carousel } from "@/components/displays/Carousel";
import {
  RenderableItineraryOffer,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";
import React from "react";
import {
  HotelRoomCarouselItem,
  HotelRoomCarouselItemIndicatorLabel,
} from "../../HotelRoomCarouselItem";
import { AddHotelRoomCarouselItem } from "../../AddHotelRoomCarouselItem";

export interface ItineraryOfferRoomEditorRoomCarouselProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  selectedHotelRoomOfferId: string | undefined;
  setSelectedHotelRoomOfferId: ({
    hotelRoomOfferId,
  }: {
    hotelRoomOfferId: string;
  }) => void;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
  includeAddRoomButton?: boolean;
  onClickAddRoomButton?: () => void;
}

export function ItineraryOfferRoomEditorRoomCarousel({
  renderableItineraryOffer,
  setSelectedHotelRoomOfferId,
  onClickUpdateItineraryOfferHotelRoomCount,
  includeAddRoomButton,
  onClickAddRoomButton,
}: ItineraryOfferRoomEditorRoomCarouselProps) {
  return (
    <Carousel
      spaceBetween={-40}
      items={
        includeAddRoomButton
          ? [...renderableItineraryOffer.hotelRoomOffers, "ADD_ROOM"]
          : [...renderableItineraryOffer.hotelRoomOffers]
      }
      renderItem={(
        hotelRoomOfferOrAddRoomItem:
          | RenderableItineraryHotelRoomOffer
          | "ADD_ROOM"
      ) => {
        if (hotelRoomOfferOrAddRoomItem === "ADD_ROOM") {
          return (
            <AddHotelRoomCarouselItem
              onClick={() => {
                if (onClickAddRoomButton) {
                  onClickAddRoomButton();
                }
              }}
            />
          );
        }
        const hotelRoomOffer = hotelRoomOfferOrAddRoomItem;

        return (
          <HotelRoomCarouselItem
            hotelRoomOffer={hotelRoomOffer}
            onClick={() =>
              setSelectedHotelRoomOfferId({
                hotelRoomOfferId: hotelRoomOffer.hotelRoomOfferId,
              })
            }
            isCountEditable={true}
            hotelRoomCarouselItemIndicatorLabel={
              HotelRoomCarouselItemIndicatorLabel.COUNT_AVAILABLE_VALUE_ONLY
            }
            onClickUpdateItineraryOfferHotelRoomCount={({
              updatedCountOffered,
              hotelRoomOfferId,
            }: {
              updatedCountOffered: number;
              hotelRoomOfferId: string;
            }) => {
              onClickUpdateItineraryOfferHotelRoomCount({
                itineraryOfferId: renderableItineraryOffer.itineraryOfferId,
                updatedCountOffered,
                hotelRoomOfferId,
              });
            }}
          />
        );
      }}
      itemKey={(
        hotelRoomOfferOrAddRoomItem:
          | RenderableItineraryHotelRoomOffer
          | "ADD_ROOM"
      ) => {
        if (hotelRoomOfferOrAddRoomItem === "ADD_ROOM") {
          return "ADD_ROOM";
        }
        return hotelRoomOfferOrAddRoomItem.hotelRoomOfferId;
      }}
      interItemComponent={<></>}
    />
  );
}

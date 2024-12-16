import React from "react";
import { Carousel } from "@/components/displays/Carousel";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import {
  HotelRoomCarouselItem,
  HotelRoomCarouselItemIndicatorLabel,
} from "@/components/workspace/ItineraryOffers/HotelRoomCarouselItem";
import { ThreeSettingSlider } from "@/components/atoms/icons/ThreeSettingSlider";

interface BifrostGroupBookingCheckoutBodyProps {
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
}

export function BifrostGroupBookingCheckoutBody({
  availableHotelRooms,
  onClickUpdateHotelRoomCountInCart,
}: BifrostGroupBookingCheckoutBodyProps) {
  const availabilityCount: number = availableHotelRooms.reduce(
    (accum: number, hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
      return accum + hotelRoomOffer.countAvailable;
    },
    0
  );

  let roomsRemainingIndicator: JSX.Element;
  if (availableHotelRooms.length === 0) {
    roomsRemainingIndicator = <>Loading...</>;
  } else {
    roomsRemainingIndicator =
      availabilityCount > 0 ? (
        <>Room Block ({`${availabilityCount} Rooms Remain`})</>
      ) : (
        <> Room Block ({"No rooms available"})</>
      );
  }

  return (
    <div className="">
      <div>
        <div className="flex text-xl items-center">
          {roomsRemainingIndicator}
          <div className="ml-4 cursor-pointer">
            <ThreeSettingSlider className="" />
          </div>
        </div>
        <div>This is a description of the experiences</div>
      </div>

      <div>
        <Carousel
          spaceBetween={-40}
          items={availableHotelRooms}
          renderItem={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
            return (
              <HotelRoomCarouselItem
                hotelRoomOffer={hotelRoomOffer}
                onClick={({
                  hotelRoomOfferId,
                }: {
                  hotelRoomOfferId: string;
                }) => {}}
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
                  onClickUpdateHotelRoomCountInCart({
                    updatedCountOffered,
                    hotelRoomOfferId,
                  });
                }}
              />
            );
          }}
          itemKey={(hotelRoomOffer: RenderableItineraryHotelRoomOffer) =>
            hotelRoomOffer.hotelRoomOfferId
          }
          interItemComponent={<></>}
        />
      </div>
    </div>
  );
}

import React from "react";
import { Carousel } from "@/components/displays/Carousel";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import {
  HotelRoomCarouselItem,
  HotelRoomCarouselItemIndicatorLabel,
} from "@/components/workspace/ItineraryOffers/HotelRoomCarouselItem";
import { ThreeSettingSlider } from "@/components/atoms/icons/ThreeSettingSlider";

interface BifrostGroupBookingCheckoutBodyProps {
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomId,
  }: {
    updatedCountOffered: number;
    hotelRoomId: string;
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

  const roomsRemainingIndicator =
    availabilityCount > 0
      ? `${availabilityCount} Rooms Remain`
      : "No rooms available";

  return (
    <div className="">
      <div>
        <div className="flex text-xl items-center">
          {`Room Block (${roomsRemainingIndicator})`}
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
                onClick={({ hotelRoomId }: { hotelRoomId: string }) => {}}
                isCountEditable={true}
                hotelRoomCarouselItemIndicatorLabel={
                  HotelRoomCarouselItemIndicatorLabel.COUNT_AVAILABLE_VALUE_ONLY
                }
                onClickUpdateItineraryOfferHotelRoomCount={({
                  updatedCountOffered,
                  hotelRoomId,
                }: {
                  updatedCountOffered: number;
                  hotelRoomId: string;
                }) => {
                  onClickUpdateHotelRoomCountInCart({
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
      </div>
    </div>
  );
}

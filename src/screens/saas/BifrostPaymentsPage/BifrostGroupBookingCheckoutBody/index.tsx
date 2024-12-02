import React from "react";
import { Settings2 } from "lucide-react";
import { Carousel } from "@/components/displays/Carousel";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { HotelRoomCarouselItem } from "@/components/workspace/ItineraryOffers/HotelRoomCarouselItem";

interface BifrostGroupBookingCheckoutBodyProps {
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
}

export function BifrostGroupBookingCheckoutBody({
  availableHotelRooms,
}: BifrostGroupBookingCheckoutBodyProps) {
  return (
    <div className="">
      <div>
        <div className="flex text-xl items-center">
          {"Room Block (5 Rooms Remain)"} <Settings2 className="w-5 h-5" />
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
                onClick={({ hotelRoomId }: { hotelRoomId: string }) => {
                  console.log(hotelRoomId);
                }}
                isCountEditable={false}
                onClickUpdateItineraryOfferHotelRoomCount={() => {}}
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

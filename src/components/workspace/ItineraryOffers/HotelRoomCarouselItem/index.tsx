import React from "react";
import { RenderableItineraryHotelRoomOffer } from "../../../../models/RenderableItineraryOffer";

export interface HotelRoomCarouselItemProps {
  hotelRoomOffer: RenderableItineraryHotelRoomOffer;
  onClick: ({ hotelRoomId }: { hotelRoomId: string }) => void;
}

export function HotelRoomCarouselItem({
  hotelRoomOffer,
  onClick,
}: HotelRoomCarouselItemProps) {
  const listPrice = Math.round(hotelRoomOffer.listPriceInCents / 100);
  const offerPrice = Math.round(hotelRoomOffer.offerPriceInCents / 100);

  return (
    <div
      className="flex flex-col items-center space-y-2"
      onClick={() =>
        onClick({
          hotelRoomId: hotelRoomOffer.hotelRoomId,
        })
      }
    >
      <div className="relative w-36 h-36 mx-auto  cursor-pointer">
        <img
          src={hotelRoomOffer.heroImageUrl}
          alt={hotelRoomOffer.hotelRoomName}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white border border-black flex items-center justify-center text-sm font-bold text-black">
          -
        </div>
      </div>
      <div className="text-center text-sm font-medium">
        {hotelRoomOffer.hotelRoomName}
      </div>
      <div className="text-center">
        <span className="text-gray-500 line-through mr-2">${listPrice}</span>
        <span className="text-black font-semibold">${offerPrice}</span>
      </div>
    </div>
  );
}

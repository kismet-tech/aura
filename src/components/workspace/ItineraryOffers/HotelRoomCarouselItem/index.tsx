import React from "react";
import { RenderableItineraryHotelRoomOffer } from "../../../../models/bifrost/RenderableItineraryOffer";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

export interface HotelRoomCarouselItemProps {
  hotelRoomOffer: RenderableItineraryHotelRoomOffer;
  onClick: ({ hotelRoomId }: { hotelRoomId: string }) => void;
  isCountEditable: boolean;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    updatedCountOffered,
    hotelRoomId,
  }: {
    updatedCountOffered: number;
    hotelRoomId: string;
  }) => void;
}

export function HotelRoomCarouselItem({
  hotelRoomOffer,
  onClick,
  isCountEditable,
  onClickUpdateItineraryOfferHotelRoomCount,
}: HotelRoomCarouselItemProps) {
  const listPrice = Math.round(hotelRoomOffer.listPriceInCents / 100);
  const offerPrice = Math.round(hotelRoomOffer.offerPriceInCents / 100);

  return (
    <TooltipProvider>
      <div
        className="flex flex-col items-center space-y-2 relative"
        onClick={() =>
          onClick({
            hotelRoomId: hotelRoomOffer.hotelRoomId,
          })
        }
      >
        <div className="relative w-36 h-36 mx-auto cursor-pointer">
          <img
            src={hotelRoomOffer.heroImageUrl}
            alt={hotelRoomOffer.hotelRoomName}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center text-sm font-bold text-black bg-white border border-black rounded-full">
            {hotelRoomOffer.countOffered > 0
              ? hotelRoomOffer.countOffered
              : "-"}
          </div>
          {isCountEditable && (
            <>
              <button
                className="absolute bottom-2 left-2 p-2 text-black hover:scale-110 focus:outline-none"
                disabled={hotelRoomOffer.countOffered <= 0}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickUpdateItineraryOfferHotelRoomCount({
                    updatedCountOffered: hotelRoomOffer.countOffered - 1,
                    hotelRoomId: hotelRoomOffer.hotelRoomId,
                  });
                }}
              >
                {hotelRoomOffer.countOffered > 0 ? (
                  <CircleArrowDown size={24} className="text-black" />
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleArrowDown size={24} className="text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {<p>Zero rooms selected</p>}
                    </TooltipContent>
                  </Tooltip>
                )}
              </button>
              <button
                className="absolute bottom-2 right-2 p-2 text-black hover:scale-110 focus:outline-none"
                disabled={
                  hotelRoomOffer.countOffered >= hotelRoomOffer.countAvailable
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onClickUpdateItineraryOfferHotelRoomCount({
                    updatedCountOffered: hotelRoomOffer.countOffered + 1,
                    hotelRoomId: hotelRoomOffer.hotelRoomId,
                  });
                }}
              >
                {hotelRoomOffer.countOffered < hotelRoomOffer.countAvailable ? (
                  <CircleArrowUp size={24} className="text-black" />
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleArrowUp size={24} className="text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {hotelRoomOffer.countAvailable > 0 ? (
                        <p>Only {hotelRoomOffer.countAvailable} Available</p>
                      ) : (
                        <p>None available</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                )}
              </button>
            </>
          )}
        </div>
        <div className="text-center text-sm font-medium">
          {hotelRoomOffer.hotelRoomName}
        </div>
        <div className="text-center">
          <span className="text-gray-500 line-through mr-2">${listPrice}</span>
          <span className="text-black font-semibold">${offerPrice}</span>
        </div>
      </div>
    </TooltipProvider>
  );
}

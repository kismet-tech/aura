import React from "react";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { Minus, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

export enum HotelRoomCarouselItemIndicatorLabel {
  COUNT_AVAILABLE_VALUE_ONLY = "COUNT_AVAILABLE_VALUE_ONLY",
  // Remove?
  COUNT_REMAINING = "COUNT_REMAINING",
}

export interface HotelRoomCarouselItemProps {
  hotelRoomOffer: RenderableItineraryHotelRoomOffer;
  onClick: ({ hotelRoomOfferId }: { hotelRoomOfferId: string }) => void;
  hotelRoomCarouselItemIndicatorLabel: HotelRoomCarouselItemIndicatorLabel;
  isCountEditable: boolean;
  onClickUpdateItineraryOfferHotelRoomCount: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
}

export function HotelRoomCarouselItem({
  hotelRoomOffer,
  onClick,
  hotelRoomCarouselItemIndicatorLabel,
  isCountEditable,
  onClickUpdateItineraryOfferHotelRoomCount,
}: HotelRoomCarouselItemProps) {
  const listPrice = Math.round(hotelRoomOffer.listPriceInCents / 100);
  const offerPrice = Math.round(hotelRoomOffer.offerPriceInCents / 100);

  let renderedIndicator: JSX.Element;
  if (
    hotelRoomCarouselItemIndicatorLabel ===
    HotelRoomCarouselItemIndicatorLabel.COUNT_REMAINING
  ) {
    renderedIndicator = (
      <>
        {" "}
        {hotelRoomOffer.countOffered > 0
          ? `${hotelRoomOffer.countOffered} remaining`
          : "-"}{" "}
      </>
    );
  } else if (
    hotelRoomCarouselItemIndicatorLabel ===
    HotelRoomCarouselItemIndicatorLabel.COUNT_AVAILABLE_VALUE_ONLY
  ) {
    renderedIndicator = (
      <>
        {" "}
        {hotelRoomOffer.countOffered > 0
          ? hotelRoomOffer.countOffered
          
          : "-"}{" "}
      </>
    );
  } else {
    throw new Error("Invalid hotelRoomCarouselItemIndicatorLabel");
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center space-y-2 relative">
        <div
          className="relative w-36 h-28 mx-auto cursor-pointer"
          onClick={() =>
            onClick({
              hotelRoomOfferId: hotelRoomOffer.hotelRoomOfferId,
            })
          }
        >
          <img
            src={hotelRoomOffer.heroImageUrl}
            alt={hotelRoomOffer.hotelRoomName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex items-center justify-center text-sm font-bold text-black bg-white border border-black rounded-full px-2">
            {renderedIndicator}
          </div>
          {isCountEditable && (
            <div className="absolute bottom-8 left-2 right-2">
              <button
                className="absolute left-0 p-2 text-black hover:scale-110 focus:outline-none"
                disabled={hotelRoomOffer.countOffered <= 0}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickUpdateItineraryOfferHotelRoomCount({
                    updatedCountOffered: hotelRoomOffer.countOffered - 1,
                    hotelRoomOfferId: hotelRoomOffer.hotelRoomOfferId,
                  });
                }}
              >
                {hotelRoomOffer.countOffered > 0 ? (
                  <Minus size={20} className="text-black bg-white rounded-full border border-black" />
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                        <Minus size={20} className="text-gray-400 bg-white rounded-full border border-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zero rooms selected</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </button>
              <button
                className="absolute right-0 p-2 text-black hover:scale-110 focus:outline-none"
                disabled={
                  hotelRoomOffer.countOffered >= hotelRoomOffer.countAvailable
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onClickUpdateItineraryOfferHotelRoomCount({
                    updatedCountOffered: hotelRoomOffer.countOffered + 1,
                    hotelRoomOfferId: hotelRoomOffer.hotelRoomOfferId,
                  });
                }}
              >
                {hotelRoomOffer.countOffered < hotelRoomOffer.countAvailable ? (
                  <Plus size={20} className="text-black bg-white rounded-full border border-black" />
                ) : (
                  <Tooltip>
                    <TooltipTrigger>
                        <Plus size={20} className="text-gray-400 bg-white rounded-full border border-gray-400" />
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
            </div>
          )}
        </div>
        {/* Left-aligned text */}
        <div className="w-36 text-left space-y-1">
          <div className="text-sm font-medium">
            {hotelRoomOffer.hotelRoomName}
          </div>
          <div className="text-sm">
            <span className="text-gray-500 line-through mr-2">
              ${listPrice}
            </span>
            <span className="text-black font-semibold">${offerPrice}</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

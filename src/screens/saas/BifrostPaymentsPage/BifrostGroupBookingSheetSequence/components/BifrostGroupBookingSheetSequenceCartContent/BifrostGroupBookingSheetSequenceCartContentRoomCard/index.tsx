import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { MoreInfoTooltip } from "@/components/MoreInfoTooltip";
import { Calendar, Users, Home } from "lucide-react";
import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { DateRange } from "react-day-picker";
import { BifrostGroupBookingCheckoutSessionSummary } from "@kismet_ai/foundation";

export interface BifrostGroupBookingSheetSequenceCartContentRoomCardProps {
  id: string;
  name: string;
  moreInfo?: {
    type: "tooltip" | "link";
    text: string;
    tooltipContent?: string;
    onClick?: () => void;
  };
  price: number;
  originalPrice: number;
  quantity: number;
  type: string;
  imageUrl: string;
  onClick?: () => void;
  isSelected?: boolean;
  checkoutSessionSummary?: BifrostGroupBookingCheckoutSessionSummary;
}

export function BifrostGroupBookingSheetSequenceCartContentRoomCard({
  name,
  moreInfo,
  price,
  originalPrice,
  quantity,
  type,
  imageUrl,
  onClick,
  isSelected,
  checkoutSessionSummary,
}: BifrostGroupBookingSheetSequenceCartContentRoomCardProps) {
  const defaultDateRange: DateRange | undefined = checkoutSessionSummary ? {
    from: new Date(
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.year,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.month - 1,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.day
    ),
    to: new Date(
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.year,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.month - 1,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.day
    )
  } : undefined;

  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);
  const squares = Array.from({ length: 6 }, (_, i) => i + 1);

  if (isSelected) {
    return (
      <div className="w-full bg-white">
        <div className="relative">
          {/* Large number badge */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-md z-10">
            1
          </div>
          
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">{name}</h2>

          {/* Price and discount section */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-bold">${price}/night</span>
            {originalPrice > price && (
              <>
                <span className="text-base line-through text-gray-400">
                  ${originalPrice}
                </span>
                <span className="text-base text-gray-500">
                  ({((1 - price / originalPrice) * 100).toFixed(0)}% off)
                </span>
              </>
            )}
          </div>

          {/* Room info with icons */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3 text-base text-gray-600">
              <Home className="w-5 h-5" />
              <span>{quantity} rooms</span>
            </div>
            <div className="flex items-center gap-3 text-base text-gray-600">
              <Calendar className="w-5 h-5" />
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-3 text-base text-gray-600">
              <Users className="w-5 h-5" />
              <span>default guests</span>
            </div>
          </div>

          {/* Numbered squares */}
          <div className="flex gap-3">
            {squares.map((num) => (
              <div
                key={num}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-base text-gray-600"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default compact view for the cart
  return (
    <div className="flex-none w-[160px]">
      <div className="overflow-hidden">
        <div className="relative">
          <div className="cursor-pointer" onClick={onClick}>
            <img
              src={imageUrl}
              alt={name}
              className="w-[160px] h-[120px] object-cover"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <span className="bg-white rounded-full px-2 py-1 text-sm">
                {quantity}
              </span>
              <span className="bg-white rounded-full px-2 py-1 text-sm">
                {type}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <h3
              className="font-semibold text-sm cursor-pointer hover:text-gray-600"
              onClick={onClick}
            >
              {name}
            </h3>
            {moreInfo && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>{moreInfo.text}</span>
                {moreInfo.type === "tooltip" ? (
                  <MoreInfoTooltip content={moreInfo.tooltipContent || ""} />
                ) : (
                  <ChevronRight
                    className="h-4 w-4"
                    onClick={moreInfo.onClick}
                  />
                )}
              </div>
            )}
            <div className="mt-1 space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="line-through text-gray-400 text-sm">
                  ${originalPrice}
                </span>
                <span className="font-semibold text-sm">${price}/night</span>
              </div>
              {originalPrice > price && (
                <div className="text-sm text-gray-500">
                  ({((1 - price / originalPrice) * 100).toFixed(0)}% off)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

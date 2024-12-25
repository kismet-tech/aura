import React from "react";
import { Info, ChevronRight } from "lucide-react";
import { MoreInfoTooltip } from "@/components/MoreInfoTooltip";

interface BifrostGroupBookingSheetSequenceCartContentRoomCardProps {
  id: number;
  name: string;
  moreInfo?: {
    type: 'tooltip' | 'link';
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
}: BifrostGroupBookingSheetSequenceCartContentRoomCardProps) {
  return (
    <div className="flex-none w-[160px]">
      <div className="overflow-hidden">
        <div className="relative">
          <div 
            className="cursor-pointer"
            onClick={onClick}
          >
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-[160px] h-[120px] object-cover"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <span className="bg-white rounded-full px-2 py-1 text-sm">{quantity}</span>
              <span className="bg-white rounded-full px-2 py-1 text-sm">{type}</span>
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
                {moreInfo.type === 'tooltip' ? (
                  <MoreInfoTooltip content={moreInfo.tooltipContent || ''} />
                ) : (
                  <ChevronRight className="h-4 w-4" onClick={moreInfo.onClick} />
                )}
              </div>
            )}
            <div className="mt-1 space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="line-through text-gray-400 text-sm">${originalPrice}</span>
                <span className="font-semibold text-sm">${price}/night</span>
              </div>
              {originalPrice > price && (
                <div className="text-sm text-gray-500">
                  ({((1 - price/originalPrice) * 100).toFixed(0)}% off)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
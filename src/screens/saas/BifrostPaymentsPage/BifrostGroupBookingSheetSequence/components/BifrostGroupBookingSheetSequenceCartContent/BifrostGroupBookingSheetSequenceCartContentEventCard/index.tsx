import React from "react";

interface BifrostGroupBookingSheetSequenceCartContentEventCardProps {
  id: number;
  name: string;
  date: string;
  status: string;
  imageUrl: string;
  onClick?: () => void;
}

export function BifrostGroupBookingSheetSequenceCartContentEventCard({
  name,
  date,
  status,
  imageUrl,
  onClick,
}: BifrostGroupBookingSheetSequenceCartContentEventCardProps) {
  return (
    <div className="flex-none w-[160px]">
      <div className="overflow-hidden">
        <div 
          className="relative cursor-pointer"
          onClick={onClick}
        >
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-[160px] h-[120px] object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-white rounded-full px-2 py-1 text-sm">{status}</span>
            </div>
          </div>
          <div className="pt-2">
            <h3 className="font-semibold text-sm">{name}</h3>
            <div className="text-sm text-gray-500">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
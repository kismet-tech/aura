import React from "react";
import { TooltipProvider } from "@/components/shadcn/tooltip";

export interface AddHotelRoomCarouselItemProps {
  onClick: ({}: {}) => void;
}

export function AddHotelRoomCarouselItem({
  onClick,
}: AddHotelRoomCarouselItemProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center space-y-2 relative">
        <div
          className="relative w-36 h-36 mx-auto cursor-pointer"
          onClick={() => onClick({})}
        >
          <img
            src={
              "https://globalsymbols.com/uploads/production/image/imagefile/16237/17_16238_c25962bd-e354-440f-b77b-5c820e96d8c0.png"
            }
            alt={"Add a room"}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Left-aligned text */}
        <div className="w-36 text-left space-y-1">
          <div className="text-sm font-medium">Add a Room</div>
        </div>
      </div>
    </TooltipProvider>
  );
}

import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms";
import { Calendar, Hotel, User, CalendarRange, Bell } from "lucide-react";
import { MonopolyHouse } from "@/components/atoms/icons/MonopolyHouse";

export interface PendingItineraryPlannerHeaderProps {
  renderablePendingItinerary: RenderablePendingItinerary;
}

export function PendingItineraryPlannerHeader({
  renderablePendingItinerary,
}: PendingItineraryPlannerHeaderProps) {
  let roomsIndicator: JSX.Element;
  if (
    renderablePendingItinerary.countOfHotelRoomsInItinerary !== undefined &&
    renderablePendingItinerary.countOfHotelRoomsInItinerary > 0
  ) {
    roomsIndicator = (
      <span className="text-xs flex items-center gap-1 truncate">
        <span className="truncate">{renderablePendingItinerary.countOfHotelRoomsInItinerary}</span>
        <span className="underline cursor-pointer truncate">choose</span>
      </span>
    );
  } else {
    roomsIndicator = <span className="underline cursor-pointer text-xs truncate">choose</span>;
  }

  return (
    <div className="bg-white px-[10px] py-[5px] min-w-[300px] w-full border border-[#D6D6D6]">
      <div className="mb-4">
        <KismetSectionHeader>
          {renderablePendingItinerary.itineraryName}
        </KismetSectionHeader>
      </div>

      <div className="flex min-w-0">
        <img
          src="https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg"
          alt="Hotel"
          className="w-24 h-[72px] object-cover mr-4 flex-shrink-0"
        />
        <div className="h-[72px] flex flex-col justify-between min-w-0 flex-1">
          <div className="flex items-center gap-4 min-w-0 max-w-[calc(300px-96px-40px)]">
            <div className="flex items-center gap-1 min-w-0">
              <div className="flex-shrink-0">
                <MonopolyHouse />
              </div>
              {roomsIndicator}
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <div className="flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <span className="underline cursor-pointer text-xs truncate">guests</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 min-w-0">
            <div className="flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs truncate">12/14/24 - 12/17/24</span>
          </div>
          
          <div className="flex items-center gap-1 min-w-0">
            <div className="flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <span className="underline cursor-pointer text-xs truncate">details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

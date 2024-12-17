import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { Calendar, ConciergeBell, DoorOpen } from "lucide-react";

export interface PendingItineraryPlannerHeaderClosedProps {
  renderablePendingItinerary: RenderablePendingItinerary;
}

export function PendingItineraryPlannerHeaderClosed({
  renderablePendingItinerary,
}: PendingItineraryPlannerHeaderClosedProps) {
  let roomsIndicator: JSX.Element;
  if (
    renderablePendingItinerary.countOfHotelRoomsInItinerary !== undefined &&
    renderablePendingItinerary.countOfHotelRoomsInItinerary > 0
  ) {
    
    roomsIndicator = (
      <span className="underline cursor-pointer text-xs truncate">
        {renderablePendingItinerary.countOfHotelRoomsInItinerary} rooms
      </span>
    );
  } else {
    roomsIndicator = <span className="underline cursor-pointer text-xs truncate">rooms</span>;
  }

  let datesIndicator: JSX.Element;
  if (renderablePendingItinerary.calendarDateRangeInItinerary) {
    datesIndicator = (
      <span className="underline cursor-pointer text-xs truncate">
        {renderCalendarDateRange({
          calendarDateRange: renderablePendingItinerary.calendarDateRangeInItinerary,
          renderedCalendarDateFormat: RenderedCalendarDateFormat.MM_SLASH_DD_SLASH_YY,
          renderedCalendarDateRangeJoinFormat: RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
          collapseStrategy: {
            collapseSameDay: true,
            collapseSameMonth: false,
          },
        })}
      </span>
    );
  } else {
    datesIndicator = <span className="underline cursor-pointer text-xs truncate">dates</span>;
  }

  return (
    <div className="bg-white px-[10px] py-[5px] min-w-[300px] w-full border border-[#D6D6D6] overflow-hidden">
      <div className="space-y-[2px]">
        <KismetSectionHeader>
          {renderablePendingItinerary.itineraryName}
        </KismetSectionHeader>

        <div className="flex items-start gap-4 min-w-0 max-w-[calc(100%-20px)] text-sm">
          <div className="flex items-center gap-1 min-w-0 basis-auto">
            <div className="flex-shrink-0">
              <DoorOpen className="w-5 h-5" strokeWidth={1.5} />
            </div>
            {roomsIndicator}
          </div>
          
          <div className="flex items-center gap-1 min-w-0 basis-fill flex-0 truncate">
            <div className="flex-shrink-0">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
            </div>
            {datesIndicator}
          </div>
          
          <div className="flex items-center gap-1 min-w-0 basis-auto">
            <div className="flex-shrink-0">
              <ConciergeBell className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="underline cursor-pointer">details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

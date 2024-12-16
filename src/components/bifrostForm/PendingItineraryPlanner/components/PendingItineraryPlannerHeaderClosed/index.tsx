import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { Calendar, Bell } from "lucide-react";
import { MonopolyHouse } from "@/components/atoms/icons/MonopolyHouse";

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
      <span className="text-xs flex items-center gap-1">
        <span>{renderablePendingItinerary.countOfHotelRoomsInItinerary}</span>
        <span className="underline cursor-pointer">choose</span>
      </span>
    );
  } else {
    roomsIndicator = <span className="underline cursor-pointer text-xs">choose</span>;
  }

  let datesIndicator: JSX.Element;
  if (renderablePendingItinerary.calendarDateRangeInItinerary) {
    datesIndicator = (
      <span className="underline cursor-pointer text-xs truncate flex-1">
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
    datesIndicator = <span className="underline cursor-pointer text-xs truncate flex-1">dates</span>;
  }

  return (
    <div className="bg-white px-[10px] py-[5px] min-w-[300px] w-full border border-[#D6D6D6]">
      <div className="space-y-[2px]">
        <KismetSectionHeader>
          {renderablePendingItinerary.itineraryName}
        </KismetSectionHeader>

        <div className="flex items-start gap-4 min-w-0 max-w-[calc(300px)]">
          <div className="flex items-center gap-1 min-w-0 flex-0">
            <div className="flex-shrink-0">
              <MonopolyHouse />
            </div>
            {roomsIndicator}
          </div>
          
          <div className="flex items-center gap-1 min-w-0 flex-0">
            <div className="flex-shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            {datesIndicator}
          </div>
          
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <span className="underline cursor-pointer text-xs flex-1">details</span>
          </div>
        </div>
      </div>
    </div>
  );
}

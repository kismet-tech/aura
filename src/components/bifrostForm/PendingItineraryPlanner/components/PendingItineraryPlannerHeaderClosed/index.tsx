import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { Calendar, Hotel, User } from "lucide-react";
import { OrnateConciergeBell } from "@/components/atoms/icons/OrnateConciergeBell";
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
      <span>
        <span className="underline cursor-pointer">
          {renderablePendingItinerary.countOfHotelRoomsInItinerary} rooms
        </span>{" "}
      </span>
    );
  } else {
    roomsIndicator = <span className="underline cursor-pointer">rooms</span>;
  }

  let datesIndicator: JSX.Element;
  if (renderablePendingItinerary.calendarDateRangeInItinerary) {
    datesIndicator = (
      <span className="underline cursor-pointer">
        {renderCalendarDateRange({
          calendarDateRange:
            renderablePendingItinerary.calendarDateRangeInItinerary,
          renderedCalendarDateFormat:
            RenderedCalendarDateFormat.MM_SLASH_DD_SLASH_YY,
          renderedCalendarDateRangeJoinFormat:
            RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
          collapseStrategy: {
            collapseSameDay: true,
            collapseSameMonth: false,
          },
        })}
      </span>
    );
  } else {
    datesIndicator = <span className="underline cursor-pointer">dates</span>;
  }

  return (
    <div className="bg-white">
      <div>
        <KismetSectionHeader>
          {renderablePendingItinerary.itineraryName}
        </KismetSectionHeader>
      </div>

      <div className="flex pt-3">
        <div className="flex">
          <div className="flex items-center mr-4">
            <div className="mr-2">
              <MonopolyHouse />
            </div>
            {roomsIndicator}
          </div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">
            <Calendar />
          </div>
          {datesIndicator}
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <OrnateConciergeBell />
          </div>
          <span className="underline cursor-pointer">details</span>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms";
import { Calendar, User, ConciergeBell, DoorOpen } from "lucide-react";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";

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
      <span>
        <span className="">
          {renderablePendingItinerary.countOfHotelRoomsInItinerary}
        </span>{" "}
        <span className="underline cursor-pointer">choose</span>
      </span>
    );
  } else {
    roomsIndicator = <span className="underline cursor-pointer">choose</span>;
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
    datesIndicator = (
      <span className="underline cursor-pointer">select dates</span>
    );
  }

  return (
    <div className="bg-white px-[10px] py-[5px] min-w-[300px] w-full border border-[#D6D6D6]">
      <div className="space-y-[2px]">
        <KismetSectionHeader>
          {renderablePendingItinerary.itineraryName}
        </KismetSectionHeader>

        <div className="flex items-center text-sm">
          <img
            src="https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg"
            alt="Hotel"
            className="w-36 h-28 object-cover mr-4"
          />
          <div className="space-y-2 max-w-[calc(100%-theme(spacing.36)-theme(spacing.4))]">
            <div className="flex truncate">
              <div className="flex items-center mr-4 truncate">
                <div className="mr-2">
                  <DoorOpen className="w-5 h-5" strokeWidth={1.5} />
                </div>
                {roomsIndicator}
              </div>
              <div className="flex items-center truncate">
                <div className="mr-2">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="underline cursor-pointer">guests</span>
              </div>
            </div>
            <div className="flex items-center truncate">
              <div className="mr-2">
                <Calendar className="w-5 h-5" strokeWidth={1.5} />
              </div>
              {datesIndicator}
            </div>
            <div className="flex items-center truncate">
              <div className="mr-2">
                <ConciergeBell className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="underline cursor-pointer">details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

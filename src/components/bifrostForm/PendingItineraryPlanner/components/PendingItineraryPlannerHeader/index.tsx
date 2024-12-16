import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms";
import { Calendar, Hotel, User } from "lucide-react";
import { OrnateConciergeBell } from "@/components/atoms/icons/OrnateConciergeBell";
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
          {renderablePendingItinerary.countOfHotelRoomsInItinerary} rooms
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
    <div className="bg-white">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <KismetSectionHeader>
            {renderablePendingItinerary.itineraryName}
          </KismetSectionHeader>
          {/* <ExpandCollapseButton
            isCollapsed={false}
            onExpand={function (): void {
              throw new Error("Function not implemented.");
            }}
            onCollapse={function (): void {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </div>
      </div>

      <div className="flex items-center">
        <img
          src="https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg"
          alt="Hotel"
          className="w-32 h-32 object-cover rounded mr-4"
        />
        <div className="space-y-2">
          <div className="flex">
            <div className="flex items-center mr-4">
              <div className="mr-2">
                <Hotel />
              </div>
              {roomsIndicator}
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <User />
              </div>
              <span className="underline cursor-pointer">guests</span>
            </div>
          </div>
          <div className="flex items-center">
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
    </div>
  );
}

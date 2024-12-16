import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { Calendar, Hotel, User } from "lucide-react";
import { OrnateConciergeBell } from "@/components/atoms/icons/OrnateConciergeBell";
import { MonopolyHouse } from "@/components/atoms/icons/MonopolyHouse";
import { ReservedBifrostFormQuestionIds } from "@kismet_ai/foundation";

export interface PendingItineraryPlannerHeaderClosedProps {
  renderablePendingItinerary: RenderablePendingItinerary;
  scrollToBifrostFormQuestion: ({
    formQuestionId,
  }: {
    formQuestionId: string;
  }) => void;
}

export function PendingItineraryPlannerHeaderClosed({
  renderablePendingItinerary,
  scrollToBifrostFormQuestion,
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
            <span
              onClick={(
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                event.preventDefault();
                scrollToBifrostFormQuestion({
                  formQuestionId: `${ReservedBifrostFormQuestionIds.ESTIMATED_GUEST_COUNT}-${ReservedBifrostFormQuestionIds.COUNT_OF_ROOMS_NEEDED}`,
                });
              }}
            >
              {roomsIndicator}
            </span>
          </div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">
            <Calendar />
          </div>
          <span
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              event.preventDefault();
              scrollToBifrostFormQuestion({
                formQuestionId: ReservedBifrostFormQuestionIds.CALENDAR_DATES,
              });
            }}
          >
            {datesIndicator}
          </span>
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

import React from "react";
import { RenderablePendingItinerary } from "../../models/RenderablePendingItinerary";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { ReservedBifrostFormQuestionIds } from "@kismet_ai/foundation";
import { Calendar, ConciergeBell, DoorOpen } from "lucide-react";

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
      <span className="underline cursor-pointer text-xs truncate">
        {renderablePendingItinerary.countOfHotelRoomsInItinerary} rooms
      </span>
    );
  } else {
    roomsIndicator = (
      <span className="underline cursor-pointer text-xs truncate">rooms</span>
    );
  }

  let datesIndicator: JSX.Element;
  if (renderablePendingItinerary.calendarDateRangeInItinerary) {
    datesIndicator = (
      <span className="underline cursor-pointer text-xs truncate">
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
      <span className="underline cursor-pointer text-xs truncate">dates</span>
    );
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

          <div className="flex items-center gap-1 min-w-0 basis-fill flex-0 truncate">
            <div className="flex-shrink-0">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span
              onClick={(
                event: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                event.preventDefault();
                scrollToBifrostFormQuestion({
                  formQuestionId: ReservedBifrostFormQuestionIds.CALENDAR_DATES,
                });
              }}
            >
              {datesIndicator}
            </span>
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

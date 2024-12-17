import React from "react";
import { RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";

export interface EventOfferCarouselItemProps {
  eventOffer: RenderableItineraryEventOffer;
  onClick: ({ eventOfferId }: { eventOfferId: string }) => void;
}

export function EventOfferCarouselItem({
  eventOffer,
  onClick,
}: EventOfferCarouselItemProps) {
  return (
    <div
      className="flex flex-col items-center space-y-2"
      onClick={() =>
        onClick({
          eventOfferId: eventOffer.eventOfferId,
        })
      }
    >
      <div className="relative w-36 h-28 mx-auto  cursor-pointer">
        <img
          src={eventOffer.imageUrl}
          alt={eventOffer.eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 pr-1 pl-1 rounded-full bg-white border border-black flex items-center justify-center text-sm font-bold text-black">
          {eventOffer.approvalStatus}
        </div>
      </div>
      <div className="text-left">
        <div>
          <span
            className="text-black font-semibold block w-36 truncate"
            title={eventOffer.eventName} // Tooltip for full name
          >
            {eventOffer.eventName}
          </span>
        </div>
        <div>
          {renderCalendarDateRange({
            calendarDateRange: eventOffer.calendarDateRange,
            renderedCalendarDateFormat:
              RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
            renderedCalendarDateRangeJoinFormat:
              RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
            collapseStrategy: {
              collapseSameDay: true,
              collapseSameMonth: true,
            },
          })}
        </div>
      </div>
    </div>
  );
}

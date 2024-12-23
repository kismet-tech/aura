import React from "react";
import { renderCalendarDateRange, RenderedCalendarDateFormat, RenderedCalendarDateRangeJoinFormat } from "@kismet_ai/foundation";
import { DoorOpen, Calendar, PartyPopper, UsersRound } from "lucide-react";

interface BifrostGroupBookingSheetSequenceItinerarySummaryProps {
  roomCount: number;
  dateRange: {
    startCalendarDate: {
      day: number;
      month: number;
      year: number;
    };
    endCalendarDate: {
      day: number;
      month: number;
      year: number;
    };
  };
  eventCount: number;
  guestCount?: number;
}

export function BifrostGroupBookingSheetSequenceItinerarySummary({
  roomCount,
  dateRange,
  eventCount,
  guestCount
}: BifrostGroupBookingSheetSequenceItinerarySummaryProps) {
  return (
    <div className="border p-4">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <div className="flex items-center gap-1">
          <DoorOpen className="h-4 w-4" />
          <span>{roomCount} Rooms</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{renderCalendarDateRange({
            calendarDateRange: dateRange,
            renderedCalendarDateFormat: RenderedCalendarDateFormat.MONTH_DAY_YEAR,
            renderedCalendarDateRangeJoinFormat: RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
            collapseStrategy: {
              collapseSameMonth: true,
              collapseSameDay: true,
            },
          })}</span>
        </div>
        <div className="flex items-center gap-1">
          <PartyPopper className="h-4 w-4" />
          <span>{eventCount} event</span>
        </div>
        {guestCount && (
          <div className="flex items-center gap-1">
            <UsersRound className="h-4 w-4" />
            <span>{guestCount} guests</span>
          </div>
        )}
      </div>
    </div>
  );
} 
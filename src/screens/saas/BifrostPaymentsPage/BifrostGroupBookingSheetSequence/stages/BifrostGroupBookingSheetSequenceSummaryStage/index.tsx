import React from "react";
import { BifrostGroupBookingSheetSequenceContentSummary } from "../../components/BifrostGroupBookingSheetSequenceContentSummary";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";

// interface RoomSummary {
//   count: number;
//   dates: string;
//   startDate: string;
//   endDate: string;
//   nights: number;
//   total: number;
//   rooms: Array<{
//     type: string;
//     count: number;
//     pricePerNight: number;
//     dates: string;
//     keyTerms: string[];
//   }>;
// }

interface EventSummary {
  count: number;
  date: string;
  total: number;
  events: Array<{
    title: string;
    date: string;
    time: string;
    status: "pending" | "confirmed" | "cancelled";
    capacity: {
      count: number;
      label: string;
    };
    price: {
      amount: number;
      label: string;
    };
    keyTerms: string[];
  }>;
}

export interface BifrostGroupBookingSheetSequenceSummaryStageProps {
  yourRooms?: RenderableItineraryHotelRoomOffer;
  heldRooms?: RenderableItineraryHotelRoomOffer;
  pendingEvents?: EventSummary;
  confirmedEvents?: EventSummary;
}

export function BifrostGroupBookingSheetSequenceSummaryStage({
  yourRooms,
  heldRooms,
  pendingEvents,
  confirmedEvents,
}: BifrostGroupBookingSheetSequenceSummaryStageProps) {
  return (
    <div className="overflow-x-hidden">
      <BifrostGroupBookingSheetSequenceContentSummary
        yourRooms={{
          count: 1,
          dates: "12/18-12/21",
          total: 0.0,
        }}
        heldRooms={{
          count: 29,
          dates: "12/18-12/21",
        }}
        pendingEvents={{
          count: 1,
          total: 100.0,
        }}
        confirmedEvents={{
          count: 0,
          total: 0,
        }}
      />
    </div>
  );
}

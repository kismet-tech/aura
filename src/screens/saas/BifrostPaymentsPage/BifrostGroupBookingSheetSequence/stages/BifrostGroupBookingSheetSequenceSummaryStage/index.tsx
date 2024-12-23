import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import { BifrostGroupBookingSheetSequenceContentSummary } from "../../components/BifrostGroupBookingSheetSequenceContentSummary";

interface RoomSummary {
  count: number;
  dates: string;
  startDate: string;
  endDate: string;
  nights: number;
  total: number;
  rooms: Array<{
    type: string;
    count: number;
    pricePerNight: number;
    dates: string;
    keyTerms: string[];
  }>;
}

interface EventSummary {
  count: number;
  date: string;
  total: number;
  events: Array<{
    title: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
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

interface BifrostGroupBookingSheetSequenceSummaryStageProps {
  yourRooms: RoomSummary;
  heldRooms: RoomSummary;
  pendingEvents: EventSummary;
  confirmedEvents: EventSummary;
}

export function BifrostGroupBookingSheetSequenceSummaryStage() {
  return (
    <div className="overflow-x-hidden">
      <BifrostGroupBookingSheetSequenceContentSummary 
        yourRooms={{
          count: 1,
          dates: "12/18-12/21",
          total: 0.00
        }}
        heldRooms={{
          count: 29,
          dates: "12/18-12/21"
        }}
        pendingEvents={{
          count: 1,
          date: "12/19",
          total: 100.00
        }}
        confirmedEvents={{
          count: 0,
          date: "",
          total: 0
        }}
      />
    </div>
  );
}

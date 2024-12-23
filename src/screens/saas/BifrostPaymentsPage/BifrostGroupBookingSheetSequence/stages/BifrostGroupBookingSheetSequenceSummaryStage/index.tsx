import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import { BifrostGroupBookingSheetSequenceContentSummary } from "../../components/BifrostGroupBookingSheetSequenceContentSummary";

export interface BifrostGroupBookingSheetSequenceSummaryStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
}

export function BifrostGroupBookingSheetSequenceSummaryStage({
  setLocalStage,
}: BifrostGroupBookingSheetSequenceSummaryStageProps) {
  return (
    <div>
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
        events={{
          count: 1,
          date: "12/19",
          total: 100.00
        }}
      />
    </div>
  );
}

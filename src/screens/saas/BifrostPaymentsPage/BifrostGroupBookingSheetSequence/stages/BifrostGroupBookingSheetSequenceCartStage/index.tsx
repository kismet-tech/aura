import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import { Button } from "@/components/shadcn/button";

export interface BifrostGroupBookingSheetSequenceCartStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
}

export function BifrostGroupBookingSheetSequenceCartStage({
  setLocalStage,
}: BifrostGroupBookingSheetSequenceCartStageProps) {
  const handleMoveToSummaryStage: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    setLocalStage(BifrostGroupBookingSheetSequenceStage.SUMMARY);
  };

  return (
    <div>
      <div>Cart</div>
      <div>
        <Button onClick={handleMoveToSummaryStage}>View Summary</Button>
      </div>
    </div>
  );
}

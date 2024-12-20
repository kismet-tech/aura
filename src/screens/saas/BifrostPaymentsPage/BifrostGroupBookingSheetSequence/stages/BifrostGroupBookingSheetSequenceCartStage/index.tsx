import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import { BifrostGroupBookingSheetSequenceCartContent } from "../../components/BifrostGroupBookingSheetSequenceCartContent";

export interface BifrostGroupBookingSheetSequenceCartStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
}

export function BifrostGroupBookingSheetSequenceCartStage({
  setLocalStage,
}: BifrostGroupBookingSheetSequenceCartStageProps) {
  return (
    <div>
      <BifrostGroupBookingSheetSequenceCartContent />
    </div>
  );
}

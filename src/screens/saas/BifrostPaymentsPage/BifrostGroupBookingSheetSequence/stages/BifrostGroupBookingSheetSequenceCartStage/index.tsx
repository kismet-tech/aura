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
  const handleOpenGuestList = (roomName: string) => {
    // Handle guest list opening logic here
  };

  return (
    <div className="overflow-x-hidden">
      <BifrostGroupBookingSheetSequenceCartContent 
        onOpenGuestList={handleOpenGuestList}
      />
    </div>
  );
}

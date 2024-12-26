import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import { BifrostGroupBookingSheetSequenceCartContent } from "../../components/BifrostGroupBookingSheetSequenceCartContent";
import { BifrostGroupBookingCheckoutCart } from "@kismet_ai/foundation";

export interface BifrostGroupBookingSheetSequenceCartStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
  cart: BifrostGroupBookingCheckoutCart;
}

export function BifrostGroupBookingSheetSequenceCartStage({
  setLocalStage,
  cart,
}: BifrostGroupBookingSheetSequenceCartStageProps) {
  const handleOpenGuestList = (roomName: string) => {
    // Handle guest list opening logic here
  };

  return (
    <div className="overflow-x-hidden">
      <BifrostGroupBookingSheetSequenceCartContent
        onOpenGuestList={handleOpenGuestList}
        cart={cart}
      />
    </div>
  );
}

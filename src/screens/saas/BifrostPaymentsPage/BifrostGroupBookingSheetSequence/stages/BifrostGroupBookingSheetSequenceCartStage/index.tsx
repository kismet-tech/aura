import React from "react";
import { BifrostGroupBookingCheckoutCart, RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { BifrostGroupBookingSheetSequenceCartContent } from "../../components/BifrostGroupBookingSheetSequenceCartContent";
import { BifrostGroupBookingSheetSequenceStage } from "../..";

interface BifrostGroupBookingSheetSequenceCartStageProps {
  setLocalStage: (stage: BifrostGroupBookingSheetSequenceStage) => void;
  cart: BifrostGroupBookingCheckoutCart;
  selectedRoom?: RenderableItineraryHotelRoomOffer | null;
}

export function BifrostGroupBookingSheetSequenceCartStage({
  setLocalStage,
  cart,
  selectedRoom,
}: BifrostGroupBookingSheetSequenceCartStageProps) {
  return (
    <BifrostGroupBookingSheetSequenceCartContent
      onOpenGuestList={(roomName: string) => {
        console.log(`Opening guest list for ${roomName}`);
      }}
      cart={cart}
      selectedRoom={selectedRoom}
    />
  );
}

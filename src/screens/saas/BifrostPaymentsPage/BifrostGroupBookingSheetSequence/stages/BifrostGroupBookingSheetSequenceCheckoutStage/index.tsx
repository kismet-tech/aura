/**
 * 🚧 WORK IN PROGRESS 🚧
 * This component is still under development and may undergo significant changes.
 */

import React from "react";
import { BifrostGroupBookingSheetSequenceCheckoutStageBody } from "./BifrostGroupBookingSheetSequenceCheckoutStageBody";

export interface BifrostGroupBookingSheetSequenceCheckoutStageProps {
  initialAcceptedState?: boolean;
}

export function BifrostGroupBookingSheetSequenceCheckoutStage({
  initialAcceptedState = false,
}: BifrostGroupBookingSheetSequenceCheckoutStageProps) {
  return (
    <BifrostGroupBookingSheetSequenceCheckoutStageBody
      initialAcceptedState={initialAcceptedState}
    />
  );
}

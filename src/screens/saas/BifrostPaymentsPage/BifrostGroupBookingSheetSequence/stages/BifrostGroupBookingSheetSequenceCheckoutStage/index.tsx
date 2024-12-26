/**
 * 🚧 WORK IN PROGRESS 🚧
 * This component is still under development and may undergo significant changes.
 */

import React from "react";
import { BifrostGroupBookingSheetSequenceCheckoutStageBody } from "./BifrostGroupBookingSheetSequenceCheckoutStageBody";

export interface BifrostGroupBookingSheetSequenceCheckoutStageProps {
  initialAcceptedState?: boolean;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
}

export function BifrostGroupBookingSheetSequenceCheckoutStage({
  initialAcceptedState = false,
  getStripePaymentIntent,
}: BifrostGroupBookingSheetSequenceCheckoutStageProps) {
  return (
    <BifrostGroupBookingSheetSequenceCheckoutStageBody
      initialAcceptedState={initialAcceptedState}
      getStripePaymentIntent={getStripePaymentIntent}
    />
  );
}

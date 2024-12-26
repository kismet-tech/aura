/**
 * 🚧 WORK IN PROGRESS 🚧
 * This component is still under development and may undergo significant changes.
 */

import React from "react";
import { BifrostGroupBookingSheetSequenceCheckoutStageBody } from "./BifrostGroupBookingSheetSequenceCheckoutStageBody";
import { BifrostGroupBookingCheckoutCart } from "@kismet_ai/foundation";

export interface BifrostGroupBookingSheetSequenceCheckoutStageProps {
  initialAcceptedState?: boolean;
  cart: BifrostGroupBookingCheckoutCart;
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

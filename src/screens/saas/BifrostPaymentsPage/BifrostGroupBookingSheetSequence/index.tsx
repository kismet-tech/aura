import React, { useState, useEffect } from "react";
import { SheetContent } from "@/components/shadcn/sheet";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";
import { BifrostGroupBookingSheetSequenceCartStage } from "./stages/BifrostGroupBookingSheetSequenceCartStage";
import { BifrostGroupBookingSheetSequenceSummaryStage } from "./stages/BifrostGroupBookingSheetSequenceSummaryStage";
import { BifrostGroupBookingSheetSequenceCheckoutStage } from "./stages/BifrostGroupBookingSheetSequenceCheckoutStage";
import { BifrostGroupBookingSheetSequenceFooter } from "./components/BifrostGroupBookingSheetSequenceFooter";
import { BifrostGroupBookingSheetSequenceHeader } from "./components/BifrostGroupBookingSheetSequenceHeader";

export enum BifrostGroupBookingSheetSequenceStage {
  CART = "CART",
  SUMMARY = "SUMMARY",
  CHECKOUT = "CHECKOUT",
}

interface BifrostGroupBookingSheetSequenceProps {
  stage?: BifrostGroupBookingSheetSequenceStage;
  cart: BifrostGroupBookingCheckoutCart;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
  selectedRoom?: RenderableItineraryHotelRoomOffer | null;
}

export function BifrostGroupBookingSheetSequence({
  stage,
  cart,
  getStripePaymentIntent,
  checkoutSessionSummary,
  selectedRoom,
}: BifrostGroupBookingSheetSequenceProps) {
  const [localStage, setLocalStage] = useState(
    stage || BifrostGroupBookingSheetSequenceStage.CART
  );
  const [isValid, setIsValid] = useState(true);


  useEffect(() => {
    if (selectedRoom) {
      setLocalStage(BifrostGroupBookingSheetSequenceStage.CART);
    }
  }, [selectedRoom]);

  const itineraryName = "Smith Wedding";


  const getStageTitle = (stage: BifrostGroupBookingSheetSequenceStage) => {
    switch (stage) {
      case BifrostGroupBookingSheetSequenceStage.CART:
        return checkoutSessionSummary.groupBookingCheckoutSessionTitle || "";
      case BifrostGroupBookingSheetSequenceStage.SUMMARY:
        return "Summary";
      case BifrostGroupBookingSheetSequenceStage.CHECKOUT:
        return "Checkout";
    }
  };

  const handleContinue = () => {
    if (localStage === BifrostGroupBookingSheetSequenceStage.CART) {
      setLocalStage(BifrostGroupBookingSheetSequenceStage.SUMMARY);
    } else if (localStage === BifrostGroupBookingSheetSequenceStage.SUMMARY) {
      setLocalStage(BifrostGroupBookingSheetSequenceStage.CHECKOUT);
    }
  };

  let renderedStage: JSX.Element = <></>;
  if (localStage === BifrostGroupBookingSheetSequenceStage.CART) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceCartStage
        setLocalStage={setLocalStage}
        cart={cart}
        selectedRoom={selectedRoom}
      />
    );
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.SUMMARY) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceSummaryStage cart={cart} />
    );
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.CHECKOUT) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceCheckoutStage
        initialAcceptedState={true}
        cart={cart}
        getStripePaymentIntent={getStripePaymentIntent}
      />
    );
  }

  return (
    <SheetContent className="w-[600px] sm:w-[540px] p-0">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{getStageTitle(localStage)}</h2>
        </div>
        {renderedStage}
      </div>
      <BifrostGroupBookingSheetSequenceFooter
        cart={cart}
        onClickContinue={handleContinue}
        isValid={isValid}
        currentStage={localStage}
      />
    </SheetContent>
  );
}

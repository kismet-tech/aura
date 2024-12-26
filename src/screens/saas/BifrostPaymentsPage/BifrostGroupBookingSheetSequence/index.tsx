import { SheetContent } from "@/components/shadcn/sheet";
import React, { useState } from "react";
import { BifrostGroupBookingSheetSequenceCartStage } from "./stages/BifrostGroupBookingSheetSequenceCartStage";
import { BifrostGroupBookingSheetSequenceSummaryStage } from "./stages/BifrostGroupBookingSheetSequenceSummaryStage";
import { BifrostGroupBookingSheetSequenceCheckoutStage } from "./stages/BifrostGroupBookingSheetSequenceCheckoutStage";
import { BifrostGroupBookingSheetSequenceHeader } from "./components/BifrostGroupBookingSheetSequenceHeader";
import { BifrostGroupBookingSheetSequenceFooter } from "./components/BifrostGroupBookingSheetSequenceFooter";
import { BifrostGroupBookingCheckoutSessionSummary } from "@kismet_ai/foundation";

export enum BifrostGroupBookingSheetSequenceStage {
  CART = "CART",
  SUMMARY = "SUMMARY",
  CHECKOUT = "CHECKOUT",
}

export interface BifrostGroupBookingSheetSequenceProps {
  stage?: BifrostGroupBookingSheetSequenceStage;
  getStripePaymentIntent: ({}: {}) => Promise<{ clientSecret: string }>;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
}

export function BifrostGroupBookingSheetSequence({
  stage,
  getStripePaymentIntent,
  checkoutSessionSummary,
}: BifrostGroupBookingSheetSequenceProps) {
  const [localStage, setLocalStage] = useState(
    stage || BifrostGroupBookingSheetSequenceStage.CART
  );
  const [isValid, setIsValid] = useState(true);

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
      />
    );
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.SUMMARY) {
    renderedStage = <BifrostGroupBookingSheetSequenceSummaryStage />;
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.CHECKOUT) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceCheckoutStage
        initialAcceptedState={true}
        getStripePaymentIntent={getStripePaymentIntent}
      />
    );
  }

  return (
    <SheetContent>
      {/* 
        Main container using flex layout:
        - flex-col: Stack children vertically
        - h-full: Take up full height of sheet
      */}
      <div className="flex flex-col h-full">
        {/* 
          Header Component:
          - Fixed at top
          - Shows current stage title
          - Handles back navigation between stages
          - Extends edge-to-edge with negative margins
        */}
        <BifrostGroupBookingSheetSequenceHeader
          title={getStageTitle(localStage)}
          onClickBack={() => {
            if (localStage === BifrostGroupBookingSheetSequenceStage.SUMMARY) {
              setLocalStage(BifrostGroupBookingSheetSequenceStage.CART);
            } else if (
              localStage === BifrostGroupBookingSheetSequenceStage.CHECKOUT
            ) {
              setLocalStage(BifrostGroupBookingSheetSequenceStage.SUMMARY);
            }
          }}
        />

        {/* 
          Content Area:
          - flex-1: Takes up remaining space between header and footer
          - overflow-auto: Enables scrolling if content is too tall
          - pt-5: Adds spacing below header
        */}
        <div className="flex-1 overflow-auto pt-5">{renderedStage}</div>

        {/* 
          Footer Component:
          - Fixed at bottom
          - Shows total amount (only in SUMMARY and CHECKOUT stages)
          - Contains action button (Continue/Checkout)
          - Extends edge-to-edge with negative margins
          - Button takes up 50% width on right side
        */}
        <BifrostGroupBookingSheetSequenceFooter
          onClickContinue={handleContinue}
          isValid={isValid}
          currentStage={localStage}
        />
      </div>
    </SheetContent>
  );
}

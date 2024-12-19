import { SheetContent } from "@/components/shadcn/sheet";
import React, { useState } from "react";
import { BifrostGroupBookingSheetSequenceCartStage } from "./stages/BifrostGroupBookingSheetSequenceCartStage";
import { BifrostGroupBookingSheetSequenceCheckoutStage } from "./stages/BifrostGroupBookingSheetSequenceCheckoutStage";
import { BifrostGroupBookingSheetSequenceSummaryStage } from "./stages/BifrostGroupBookingSheetSequenceSummaryStage";

export enum BifrostGroupBookingSheetSequenceStage {
  CART = "CART",
  SUMMARY = "SUMMARY",
  CHECKOUT = "CHECKOUT",
}

export interface BifrostGroupBookingSheetSequenceProps {
  stage: BifrostGroupBookingSheetSequenceStage;
}

export function BifrostGroupBookingSheetSequence({
  stage,
}: BifrostGroupBookingSheetSequenceProps) {
  const [localStage, setLocalStage] = useState(stage);

  console.log(`localStage: ${localStage}`);

  let renderedStage: JSX.Element = <></>;
  if (localStage === BifrostGroupBookingSheetSequenceStage.CART) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceCartStage
        setLocalStage={setLocalStage}
      />
    );
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.SUMMARY) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceSummaryStage
        setLocalStage={setLocalStage}
      />
    );
  } else if (localStage === BifrostGroupBookingSheetSequenceStage.CHECKOUT) {
    renderedStage = (
      <BifrostGroupBookingSheetSequenceCheckoutStage
        setLocalStage={setLocalStage}
      />
    );
  }

  return (
    <SheetContent>
      <div className="pt-5">{renderedStage}</div>
    </SheetContent>
  );
}

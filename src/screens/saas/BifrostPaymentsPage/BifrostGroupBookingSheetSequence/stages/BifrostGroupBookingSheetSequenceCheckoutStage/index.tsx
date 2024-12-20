/**
 * 🚧 WORK IN PROGRESS 🚧
 * This component is still under development and may undergo significant changes.
 */

import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";

export interface BifrostGroupBookingSheetSequenceCheckoutStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
}

export function BifrostGroupBookingSheetSequenceCheckoutStage({
  setLocalStage,
}: BifrostGroupBookingSheetSequenceCheckoutStageProps) {
  const handleMoveToCartStage: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    setLocalStage(BifrostGroupBookingSheetSequenceStage.CART);
  };

  const handleMoveToSummaryStage: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    setLocalStage(BifrostGroupBookingSheetSequenceStage.SUMMARY);
  };

  return (
    <div>
      
    </div>
  );
}

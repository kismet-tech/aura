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
      <div>Checkout</div>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              onClick={handleMoveToCartStage}
              className="cursor-pointer"
            >
              Cart
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              onClick={handleMoveToSummaryStage}
              className="cursor-pointer"
            >
              Summary
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

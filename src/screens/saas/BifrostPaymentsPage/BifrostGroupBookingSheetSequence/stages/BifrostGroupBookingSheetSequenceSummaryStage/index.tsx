import React from "react";
import { BifrostGroupBookingSheetSequenceStage } from "../..";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { Button } from "@/components/shadcn/button";

export interface BifrostGroupBookingSheetSequenceSummaryStageProps {
  setLocalStage: React.Dispatch<
    React.SetStateAction<BifrostGroupBookingSheetSequenceStage>
  >;
}

export function BifrostGroupBookingSheetSequenceSummaryStage({
  setLocalStage,
}: BifrostGroupBookingSheetSequenceSummaryStageProps) {
  const handleMoveToCartStage: React.MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    setLocalStage(BifrostGroupBookingSheetSequenceStage.CART);
  };

  const handleMoveToCheckoutStage: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
    setLocalStage(BifrostGroupBookingSheetSequenceStage.CHECKOUT);
  };

  return (
    <div>
      <div>Summary</div>
      <div>
        <Button onClick={handleMoveToCheckoutStage}>View Checkout</Button>
      </div>

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
            <BreadcrumbItem>
              <BreadcrumbPage>Summary</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

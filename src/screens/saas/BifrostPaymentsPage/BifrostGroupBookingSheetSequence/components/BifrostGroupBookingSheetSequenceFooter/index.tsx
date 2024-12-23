import React from "react";
import { Button } from "@/components/shadcn/button";

interface BifrostGroupBookingSheetSequenceFooterProps {
  onClickContinue: () => void;
  isValid: boolean;
  currentStage: "CART" | "SUMMARY" | "CHECKOUT";
  paymentAmount?: number;
  hasFullPayment?: boolean;
  hasRoomBlock?: boolean;
  needsQuote?: boolean;
}

export function BifrostGroupBookingSheetSequenceFooter({
  onClickContinue,
  isValid,
  currentStage,
  paymentAmount = 100.00,
  hasFullPayment = false,
  hasRoomBlock = true,
  needsQuote = false
}: BifrostGroupBookingSheetSequenceFooterProps) {
  const getButtonText = () => {
    if (currentStage === "CART") return "Continue";
    if (needsQuote) return "Request Quote";
    if (hasRoomBlock && !hasFullPayment) return (
      <>
        Block Rooms
        <br />
        Place Hold
      </>
    );
    if (!hasFullPayment) return "Place Hold";
    return "Checkout";
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 w-[calc(100%+3rem)] -ml-6 -mb-6 h-16 px-6">
      <div className="flex flex-col">
        {(currentStage === "SUMMARY" || currentStage === "CHECKOUT") && (
          <>
            <span className="text-sm">Total</span>
            <span className="text-lg font-semibold">${paymentAmount.toFixed(2)}</span>
          </>
        )}
      </div>
      <div className="w-1/2 pl-3">
        <Button 
          onClick={onClickContinue}
          disabled={!isValid}
          className="w-full min-h-[48px] whitespace-normal text-sm leading-tight"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}

// Example usage:
<BifrostGroupBookingSheetSequenceFooter
  onClickContinue={() => {
    console.log("Continue clicked")
  }}
  isValid={true}
  currentStage="CART"
/>
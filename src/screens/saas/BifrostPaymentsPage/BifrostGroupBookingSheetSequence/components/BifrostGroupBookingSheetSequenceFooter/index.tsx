import React from "react";
import { Button } from "@/components/shadcn/button";

interface BifrostGroupBookingSheetSequenceFooterProps {
  onClickContinue: () => void;
  isValid: boolean;
  currentStage: "CART" | "SUMMARY" | "CHECKOUT";
  paymentAmount?: number;
  hasRooms?: boolean;
  hasHold?: boolean;
  hasRoomBlock?: boolean;
  needsQuote?: boolean;
}

export function BifrostGroupBookingSheetSequenceFooter({
  onClickContinue,
  isValid,
  currentStage,
  paymentAmount = 100.00,
  hasRooms = true,
  hasHold = true,
  hasRoomBlock = true,
  needsQuote = false
}: BifrostGroupBookingSheetSequenceFooterProps) {
  const getButtonText = () => {
    if (currentStage === "CART") return "Continue";
    if (needsQuote) return "Request Quote";
    if (hasRooms && hasRoomBlock && hasHold) return (
      <>
        Book & Block Rooms,
        <br />
        Place Hold
      </>
    );
    if (hasRoomBlock && hasHold) return (
      <>
        Block Rooms,
        <br />
        Place Hold
      </>
    );
    if (hasRoomBlock) return "Block Rooms";
    if (hasHold) return "Place Hold";
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
        {currentStage !== "CHECKOUT" && (
          <Button
            onClick={onClickContinue}
            disabled={!isValid}
            className="w-full min-h-[48px] whitespace-normal text-xs leading-tight"
          >
            {getButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
}

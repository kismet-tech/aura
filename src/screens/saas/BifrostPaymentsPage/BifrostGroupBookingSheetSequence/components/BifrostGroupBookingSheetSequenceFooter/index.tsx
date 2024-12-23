import React from "react";
import { Button } from "@/components/shadcn/button";

interface BifrostGroupBookingSheetSequenceFooterProps {
  onClickContinue: () => void;
  isValid: boolean;
  currentStage: "CART" | "SUMMARY" | "CHECKOUT";
}

export function BifrostGroupBookingSheetSequenceFooter({
  onClickContinue,
  isValid,
  currentStage,
}: BifrostGroupBookingSheetSequenceFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 w-[calc(100%+3rem)] -ml-6 -mb-6 h-16 px-6">
      <div className="flex flex-col">
        {(currentStage === "SUMMARY" || currentStage === "CHECKOUT") && (
          <>
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-lg font-semibold">$299.99</span>
          </>
        )}
      </div>
      <div className="w-1/2 pl-3">
        <Button 
          onClick={onClickContinue}
          disabled={!isValid}
          className="w-full"
        >
          {currentStage === "CART" ? "Continue" : "Checkout"}
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
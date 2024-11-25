import React from "react";

export interface ItineraryOfferTermsAndConditionsPresentationProps {
  conditionText: string;
}

export function ItineraryOfferTermsAndConditionsPresentation({
  conditionText,
}: ItineraryOfferTermsAndConditionsPresentationProps) {
  return (
    <div>
      <div className="font-bold text-lg">Place Hold Terms and Conditions</div>
      <div>{conditionText}</div>
    </div>
  );
}

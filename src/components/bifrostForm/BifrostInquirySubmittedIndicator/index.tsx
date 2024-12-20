import { KismetSectionHeader } from "@/components/atoms";
import React from "react";

export interface BifrostInquirySubmittedIndicatorProps {
  assignedSalesAgentName: string;
  hotelName: string;
}

export function BifrostInquirySubmittedIndicator({
  assignedSalesAgentName,
  hotelName,
}: BifrostInquirySubmittedIndicatorProps) {
  return (
    <div>
      <KismetSectionHeader>Inquiry Submitted</KismetSectionHeader>
      <div>
        Thank you for submitting your inquiry. {assignedSalesAgentName} from the{" "}
        {hotelName} team will be in touch soon.
      </div>
    </div>
  );
}

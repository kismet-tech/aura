import { KismetSectionHeader } from "@/components/atoms";
import React from "react";

export interface BifrostInquirySubmittedIndicatorProps {
  assignedSalesAgentName: string;
}

export function BifrostInquirySubmittedIndicator({
  assignedSalesAgentName,
}: BifrostInquirySubmittedIndicatorProps) {
  return (
    <div>
      <KismetSectionHeader>Inquiry Submitted</KismetSectionHeader>
      <div>
        Thank you for submitting your inquiry. {assignedSalesAgentName} will be
        in touch soon.
      </div>
    </div>
  );
}

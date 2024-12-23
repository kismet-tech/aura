import React, { useState } from "react";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { BifrostGroupBookingSheetSequenceItinerarySummary } from "../BifrostGroupBookingSheetSequenceItinerarySummary";

interface BifrostGroupBookingSheetSequenceHeaderProps {
  title: string;
  onClickBack?: () => void;
}

export function BifrostGroupBookingSheetSequenceHeader({
  title,
  onClickBack,
}: BifrostGroupBookingSheetSequenceHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        {onClickBack && (
          <button onClick={onClickBack} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <div className="flex items-center border-red-500-0% mr-4">
          <div className="text-xl font-semibold">{title}</div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="ml-2"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <BifrostGroupBookingSheetSequenceItinerarySummary 
          roomCount={30}
          dateRange={{
            startCalendarDate: {
              day: 19,
              month: 12,
              year: 2024
            },
            endCalendarDate: {
              day: 21,
              month: 12,
              year: 2024
            }
          }}
          eventCount={1}
          guestCount={50}
        />
      )}
    </div>
  );
}

// Example usage:
<BifrostGroupBookingSheetSequenceHeader
  title="Checkout"
  onClickBack={() => {
    console.log("Back clicked")
  }}
/>
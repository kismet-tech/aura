import React from "react";

interface BifrostGroupBookingSheetSequenceEditorEventBodyProps {
  eventName: string;
}

export function BifrostGroupBookingSheetSequenceEditorEventBody({
  eventName
}: BifrostGroupBookingSheetSequenceEditorEventBodyProps) {
  return (
    <div className="mt-4 p-4">
      <div className="text-gray-500 text-center">
        <p className="text-lg font-medium">Event Details Coming Soon</p>
        <p className="mt-2">Event editing features for {eventName} will be available in a future update.</p>
      </div>
    </div>
  );
} 
import React from "react";
import { BifrostGroupBookingSheetSequenceSpecialHeader } from "../BifrostGroupBookingSheetSequenceSpecialHeader";

interface BifrostGroupBookingSheetSequenceGuestListProps {
  onBack: () => void;
  roomName: string;
}

export function BifrostGroupBookingSheetSequenceGuestList({
  onBack,
  roomName
}: BifrostGroupBookingSheetSequenceGuestListProps) {
  return (
    <div className="h-full">
      <BifrostGroupBookingSheetSequenceSpecialHeader 
        title={`Guest List - ${roomName}`}
        onClickBack={onBack}
      />
      <div className="mt-4 p-4">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium">Coming Soon</p>
          <p className="mt-2">Guest list management features will be available in a future update.</p>
        </div>
      </div>
    </div>
  );
} 
import React from "react";

interface BifrostGroupBookingSheetSequenceEditorRoomBodyProps {
  roomName: string;
}

export function BifrostGroupBookingSheetSequenceEditorRoomBody({
  roomName
}: BifrostGroupBookingSheetSequenceEditorRoomBodyProps) {
  return (
    <div className="mt-4 p-4">
      <div className="text-gray-500 text-center">
        <p className="text-lg font-medium">Room Details Coming Soon</p>
        <p className="mt-2">Room editing features for {roomName} will be available in a future update.</p>
      </div>
    </div>
  );
} 
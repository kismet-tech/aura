import React from "react";
import { BifrostGroupBookingSheetSequenceSpecialHeader } from "../BifrostGroupBookingSheetSequenceSpecialHeader";
import { BifrostGroupBookingSheetSequenceEditorRoomBody } from "./BifrostGroupBookingSheetSequenceEditorRoomBody";
import { BifrostGroupBookingSheetSequenceEditorEventBody } from "./BifrostGroupBookingSheetSequenceEditorEventBody";
import { BifrostGroupBookingSheetSequenceEditorAddRoomBody } from "./BifrostGroupBookingSheetSequenceEditorAddRoomBody";
import { BifrostGroupBookingSheetSequenceEditorAddEventBody } from "./BifrostGroupBookingSheetSequenceEditorAddEventBody";

interface BifrostGroupBookingSheetSequenceEditorProps {
  onBack: () => void;
  title: string;
  type: 'room-details' | 'event-details' | 'guest-list' | 'add-room' | 'add-event';
  name: string;
}

export function BifrostGroupBookingSheetSequenceEditor({
  onBack,
  title,
  type,
  name
}: BifrostGroupBookingSheetSequenceEditorProps) {
  return (
    <div className="h-full">
      <BifrostGroupBookingSheetSequenceSpecialHeader 
        title={title}
        onClickBack={onBack}
      />
      {type === 'room-details' && <BifrostGroupBookingSheetSequenceEditorRoomBody roomName={name} />}
      {type === 'event-details' && <BifrostGroupBookingSheetSequenceEditorEventBody eventName={name} />}
      {type === 'add-room' && <BifrostGroupBookingSheetSequenceEditorAddRoomBody />}
      {type === 'add-event' && <BifrostGroupBookingSheetSequenceEditorAddEventBody />}
      {type === 'guest-list' && (
        <div className="mt-4 p-4">
          <div className="text-gray-500 text-center">
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="mt-2">Guest list management features will be available in a future update.</p>
          </div>
        </div>
      )}
    </div>
  );
} 
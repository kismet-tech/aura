import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { BifrostGroupBookingSheetSequenceContentSummaryLineItem } from "../BifrostGroupBookingSheetSequenceContentSummaryLineItem";
import { BifrostGroupBookingSheetSequenceContentSummaryEventLineItem } from "../BifrostGroupBookingSheetSequenceContentSummaryEventLineItem";

interface BifrostGroupBookingSheetSequenceContentSummaryProps {
  yourRooms: {
    count: number;
    dates: string;
    total: number;
  };
  heldRooms: {
    count: number;
    dates: string;
  };
  events: {
    count: number;
    date: string;
    total: number;
  };
}

export function BifrostGroupBookingSheetSequenceContentSummary({
  yourRooms,
  heldRooms,
  events,
}: BifrostGroupBookingSheetSequenceContentSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<{
    yourRooms: boolean;
    heldRooms: boolean;
    events: boolean;
  }>({
    yourRooms: false,
    heldRooms: false,
    events: false,
  });

  return (
    <div className="space-y-6">
      <h2 className="font-semibold">In Cart</h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Your Rooms</h3>
            <button
              onClick={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  yourRooms: !prev.yourRooms,
                }))
              }
              className="text-gray-500"
            >
              {expandedSections.yourRooms ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              Rooms Total: {yourRooms.count} room, {yourRooms.dates}{" "}
              <Info className="h-4 w-4" />
            </div>
            <div>${yourRooms.total.toFixed(2)}</div>
          </div>
          {expandedSections.yourRooms && (
            <div className="mt-2">
              {/* BifrostGroupBookingSheetSequenceContentSummaryLineItem will go here */}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Held For your Guests</h3>
            <button
              onClick={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  heldRooms: !prev.heldRooms,
                }))
              }
              className="text-gray-500"
            >
              {expandedSections.heldRooms ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              Rooms Total: {heldRooms.count} rooms, {heldRooms.dates}{" "}
              <Info className="h-4 w-4" />
            </div>
            <div>Guests pay</div>
          </div>
          {expandedSections.heldRooms && (
            <div className="mt-2">
              <BifrostGroupBookingSheetSequenceContentSummaryLineItem
                roomCount={29}
                title="Run of House"
                nights={3}
                dates="Dec 18-21"
                price={{
                  amountInCents: 523 * 100,
                  label: "/room/night + taxes and fees",
                }}
                keyTerms={[
                  "29 Rooms will be held for guest booking",
                  "Unbooked rooms will be released 30 days before event",
                ]}
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Pending</h3>
            <button
              onClick={() =>
                setExpandedSections((prev) => ({
                  ...prev,
                  events: !prev.events,
                }))
              }
              className="text-gray-500"
            >
              {expandedSections.events ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              Events Total: {events.count} event, {events.date}{" "}
              <Info className="h-4 w-4" />
            </div>
            <div>${events.total.toFixed(2)} (refundable hold)</div>
          </div>
          {expandedSections.events && (
            <div className="mt-2">
              <BifrostGroupBookingSheetSequenceContentSummaryEventLineItem
                status="pending"
                title="Rehearsal Dinner"
                date="Friday 12/19"
                time="7-10pm"
                capacity={{
                  count: 60,
                  label: "Guest Capacity (Maximum)",
                }}
                price={{
                  amount: 7000,
                  label: "F&B Minimum",
                }}
                keyTerms={[
                  "$100 refundable hold pending approval of the Rehearsal Dinner Event",
                ]}
                image="/path/to/dinner-image.jpg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

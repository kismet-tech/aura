import React from "react";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { RoomCard } from "@/components/atoms/RoomCard";

interface BifrostRoomBlockPageProps {
  rooms: RenderableItineraryHotelRoomOffer[];
  variant: "host" | "saas";
  onUpdateCount: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
  onBack: () => void;
}

export function BifrostRoomBlockPage({
  rooms,
  variant,
  onUpdateCount,
  onBack,
}: BifrostRoomBlockPageProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Room Block</h1>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.hotelRoomOfferId}
            room={room}
            variant={variant}
            onUpdateCount={(updatedCount) => 
              onUpdateCount({
                updatedCountOffered: updatedCount,
                hotelRoomOfferId: room.hotelRoomOfferId,
              })
            }
          />
        ))}
      </div>
    </div>
  );
} 
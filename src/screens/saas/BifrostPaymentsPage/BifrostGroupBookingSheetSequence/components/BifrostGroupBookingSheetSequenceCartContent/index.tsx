import React from "react";
import { BifrostGroupBookingSheetSequenceCartContentScroll } from "./BifrostGroupBookingSheetSequenceCartContentScroll";

interface BifrostGroupBookingSheetSequenceCartContentProps {
  // TODO: @backend-team
  // These will be the props needed from the API:
  // - List of rooms with details (array of room objects)
  // - List of events/experiences (array of event objects)
  // - Room block total count
  // - Event count
  // For the exact data structure, see the dummy data below
}

export function BifrostGroupBookingSheetSequenceCartContent({}: BifrostGroupBookingSheetSequenceCartContentProps) {
  // TODO: @backend-team
  // This is dummy data showing the expected data structure
  // Replace with actual API response
  // 
  // Room object structure:
  // - id: number (unique identifier)
  // - name: string (room name)
  // - subtitle: string (additional info or link text)
  // - price: number (current price)
  // - originalPrice: number (price before discount)
  // - quantity: number (number of rooms of this type)
  // - type: string (ROH or Your Room)
  // - imageUrl: string (URL to room image)
  const rooms = [
    {
      id: 1,
      name: "Run of House",
      subtitle: "(any room)",
      price: 323,
      originalPrice: 387,
      quantity: 29,
      type: "ROH",
      imageUrl: "https://placehold.co/160x120"
    },
    {
      id: 2,
      name: "Bridal Suite",
      subtitle: "guest list >",
      price: 0,
      originalPrice: 1295,
      quantity: 1,
      type: "Your Room",
      imageUrl: "https://placehold.co/160x120"
    }
  ];

  // TODO: @backend-team
  // Event object structure:
  // - id: number (unique identifier)
  // - name: string (event name)
  // - date: string (formatted date string)
  // - status: string (Pending, Confirmed, etc.)
  // - imageUrl: string (URL to event image)
  const events = [
    {
      id: 1,
      name: "Rehearsal dinner",
      date: "Dec 19",
      status: "Pending",
      imageUrl: "https://placehold.co/160x120"
    }
  ];

  return (
    <div className="space-y-8">
      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Rooms"
        description="You have a room block of 30 rooms including the bridal suite"
      >
        {rooms.map(room => (
          <div key={room.id} className="flex-none w-[160px]">
            <div className="overflow-hidden">
              <div className="relative">
                <img 
                  src={room.imageUrl} 
                  alt={room.name} 
                  className="w-[160px] h-[120px] object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-white rounded-full px-2 py-1 text-sm">{room.quantity}</span>
                  <span className="bg-white rounded-full px-2 py-1 text-sm">{room.type}</span>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-semibold text-sm">{room.name}</h3>
                <p className="text-sm text-gray-500">{room.subtitle}</p>
                <div className="mt-1 space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="line-through text-gray-400 text-sm">${room.originalPrice}</span>
                    <span className="font-semibold text-sm">${room.price}/night</span>
                  </div>
                  {room.originalPrice > room.price && (
                    <div className="text-sm text-gray-500">
                      ({((1 - room.price/room.originalPrice) * 100).toFixed(0)}% off)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </BifrostGroupBookingSheetSequenceCartContentScroll>

      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Events"
        description="You have 1 event added to your itinerary."
      >
        {events.map(event => (
          <div key={event.id} className="flex-none w-[160px]">
            <div className="border overflow-hidden">
              <div className="relative">
                <img 
                  src={event.imageUrl} 
                  alt={event.name} 
                  className="w-[160px] h-[120px] object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-white rounded-full px-2 py-1 text-sm">{event.status}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{event.name}</h3>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </BifrostGroupBookingSheetSequenceCartContentScroll>
    </div>
  );
} 
import React, { useState } from "react";
import { BifrostGroupBookingSheetSequenceCartContentScroll } from "./BifrostGroupBookingSheetSequenceCartContentScroll";
import { BifrostGroupBookingSheetSequenceCartContentRoomCard } from "./BifrostGroupBookingSheetSequenceCartContentRoomCard";
import { BifrostGroupBookingSheetSequenceCartContentEventCard } from "./BifrostGroupBookingSheetSequenceCartContentEventCard";
import { BifrostGroupBookingSheetSequenceCartContentAddCard } from "./BifrostGroupBookingSheetSequenceCartContentAddCard";
import { BifrostGroupBookingSheetSequenceGuestList } from "../BifrostGroupBookingSheetSequenceGuestList";
import { BifrostGroupBookingSheetSequenceEditor } from "../BifrostGroupBookingSheetSequenceEditor";

export function BifrostGroupBookingSheetSequenceCartContent({
  onOpenGuestList
}: {
  onOpenGuestList: (roomName: string) => void;
}) {
  const [guestListRoom, setGuestListRoom] = useState<{name: string} | null>(null);

  const [editor, setEditor] = useState<{
    type: 'guest-list' | 'room-details' | 'event-details' | 'add-room' | 'add-event';
    title: string;
    name: string;
  } | null>(null);

  const rooms = [
    {
      id: 1,
      name: "Run of House",
      moreInfo: {
        type: 'tooltip' as const,
        text: '(any room)',
        tooltipContent: 'Run of House means you will be assigned any available room type upon check-in'
      },
      onClick: () => setEditor({
        type: 'room-details',
        title: 'Run of House Details',
        name: "Run of House"
      }),
      price: 323,
      originalPrice: 387,
      quantity: 29,
      type: "ROH",
      imageUrl: "https://placehold.co/160x120"
    },
    {
      id: 2,
      name: "Bridal Suite",
      moreInfo: {
        type: 'link' as const,
        text: 'guest list',
        onClick: () => setEditor({
          type: 'guest-list',
          title: 'Guest List - Bridal Suite',
          name: "Bridal Suite"
        })
      },
      onClick: () => setEditor({
        type: 'room-details',
        title: 'Bridal Suite Details',
        name: "Bridal Suite"
      }),
      price: 0,
      originalPrice: 1295,
      quantity: 1,
      type: "Your Room",
      imageUrl: "https://placehold.co/160x120"
    }
  ];

  const events = [
    {
      id: 1,
      name: "Welcome Reception",
      onClick: () => setEditor({
        type: 'event-details',
        title: 'Welcome Reception Details',
        name: "Welcome Reception"
      }),
      date: "Dec 19",
      status: "Pending",
      imageUrl: "https://placehold.co/160x120"
    }
  ];

  if (editor) {
    return (
      <div className="absolute inset-0 bg-white z-10">
        <BifrostGroupBookingSheetSequenceEditor
          title={editor.title}
          type={editor.type}
          name={editor.name}
          onBack={() => setEditor(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Rooms"
        description="You have a room block of 30 rooms including the bridal suite"
      >
        {rooms.map(room => (
          <BifrostGroupBookingSheetSequenceCartContentRoomCard
            key={room.id}
            {...room}
          />
        ))}
        <BifrostGroupBookingSheetSequenceCartContentAddCard 
          title="room"
          onClick={() => {
            setEditor({
              type: 'add-room',
              title: 'Add Room',
              name: 'New Room'
            });
          }}
        />
      </BifrostGroupBookingSheetSequenceCartContentScroll>

      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Events"
        description="You have 1 event added to your itinerary."
      >
        {events.map(event => (
          <BifrostGroupBookingSheetSequenceCartContentEventCard
            key={event.id}
            {...event}
          />
        ))}
        <BifrostGroupBookingSheetSequenceCartContentAddCard 
          title="event"
          onClick={() => {
            setEditor({
              type: 'add-event',
              title: 'Add Event',
              name: 'New Event'
            });
          }}
        />
      </BifrostGroupBookingSheetSequenceCartContentScroll>
    </div>
  );
}

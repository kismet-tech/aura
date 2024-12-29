import React, { useState } from "react";
import { BifrostGroupBookingSheetSequenceCartContentScroll } from "./BifrostGroupBookingSheetSequenceCartContentScroll";
import {
  BifrostGroupBookingSheetSequenceCartContentRoomCard,
  BifrostGroupBookingSheetSequenceCartContentRoomCardProps,
} from "./BifrostGroupBookingSheetSequenceCartContentRoomCard";
import { BifrostGroupBookingSheetSequenceCartContentEventCard } from "./BifrostGroupBookingSheetSequenceCartContentEventCard";
import { BifrostGroupBookingSheetSequenceCartContentAddCard } from "./BifrostGroupBookingSheetSequenceCartContentAddCard";
import { BifrostGroupBookingSheetSequenceEditor } from "../BifrostGroupBookingSheetSequenceEditor";
import {
  BifrostGroupBookingCheckoutCart,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";

export interface BifrostGroupBookingSheetSequenceCartContentProps {
  onOpenGuestList: (roomName: string) => void;
  cart: BifrostGroupBookingCheckoutCart;
  selectedRoom?: RenderableItineraryHotelRoomOffer | null;
}

export function BifrostGroupBookingSheetSequenceCartContent({
  onOpenGuestList,
  cart,
  selectedRoom,
}: BifrostGroupBookingSheetSequenceCartContentProps) {
  const [guestListRoom, setGuestListRoom] = useState<{ name: string } | null>(
    null
  );

  const bifrostGroupBookingSheetSequenceCartContentRoomCardElements: BifrostGroupBookingSheetSequenceCartContentRoomCardProps[] =
    cart.hotelRooms.map(
      (
        renderableItineraryHotelRoomOffer: RenderableItineraryHotelRoomOffer
      ) => {
        if ("runOfHouseDetails" in renderableItineraryHotelRoomOffer) {
          return {
            id: renderableItineraryHotelRoomOffer.hotelRoomOfferId,
            name: renderableItineraryHotelRoomOffer.hotelRoomName,
            moreInfo: {
              type: "tooltip" as const,
              text: "(any room)",
              tooltipContent:
                "Run of House means you will be assigned any available room type upon check-in",
            },
            price: renderableItineraryHotelRoomOffer.offerPriceInCents / 100,
            originalPrice:
              renderableItineraryHotelRoomOffer.listPriceInCents / 100,
            quantity: renderableItineraryHotelRoomOffer.countOffered,
            type: "Room",
            imageUrl: renderableItineraryHotelRoomOffer.heroImageUrl,
            onClick: () =>
              setEditor({
                type: "room-details",
                title: "Run of House Details",
                name: "Run of House",
              }),
          };
        } else if ("hotelRoomId" in renderableItineraryHotelRoomOffer) {
          return {
            id: renderableItineraryHotelRoomOffer.hotelRoomOfferId,
            name: renderableItineraryHotelRoomOffer.hotelRoomName,
            moreInfo: {
              type: "link" as const,
              text: "guest list",
              onClick: () =>
                setEditor({
                  type: "guest-list",
                  title: `Guest List - ${renderableItineraryHotelRoomOffer.hotelRoomName}`,
                  name: renderableItineraryHotelRoomOffer.hotelRoomName,
                }),
            },
            onClick: () =>
              setEditor({
                type: "room-details",
                title: `${renderableItineraryHotelRoomOffer.hotelRoomName} Details`,
                name: renderableItineraryHotelRoomOffer.hotelRoomName,
              }),
            price: renderableItineraryHotelRoomOffer.offerPriceInCents / 100,
            originalPrice:
              renderableItineraryHotelRoomOffer.listPriceInCents / 100,
            quantity: renderableItineraryHotelRoomOffer.countOffered,
            type: "Your Room",
            imageUrl: renderableItineraryHotelRoomOffer.heroImageUrl,
          };
        } else {
          throw new Error("Invalid hotel room offer");
        }
      }
    );

  const [editor, setEditor] = useState<{
    type:
      | "guest-list"
      | "room-details"
      | "event-details"
      | "add-room"
      | "add-event";
    title: string;
    name: string;
  } | null>(selectedRoom ? {
    type: "room-details",
    title: `${selectedRoom.hotelRoomName} Details`,
    name: selectedRoom.hotelRoomName,
  } : null);

  // If we have a selected room, show it in the BifrostGroupBookingSheetSequenceCartContentRoomCard format
  if (selectedRoom) {
    return (
      <div className="p-4">
        <BifrostGroupBookingSheetSequenceCartContentRoomCard
          id={selectedRoom.hotelRoomOfferId}
          name={selectedRoom.hotelRoomName}
          price={selectedRoom.offerPriceInCents / 100}
          originalPrice={selectedRoom.listPriceInCents / 100}
          quantity={selectedRoom.countOffered}
          type={selectedRoom.hotelRoomName}
          imageUrl={selectedRoom.heroImageUrl}
          isSelected={true}
        />
      </div>
    );
  }

  // If we have an editor state, show the editor
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

  const events = [
    {
      id: 1,
      name: "Welcome Reception",
      onClick: () =>
        setEditor({
          type: "event-details",
          title: "Welcome Reception Details",
          name: "Welcome Reception",
        }),
      date: "Dec 19",
      status: "Pending",
      imageUrl: "https://placehold.co/160x120",
    },
  ];

  // Otherwise show the default cart content
  return (
    <div className="space-y-8">
      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Rooms"
        description="You have a room block of 30 rooms including the bridal suite"
      >
        {bifrostGroupBookingSheetSequenceCartContentRoomCardElements.map(
          (bifrostGroupBookingSheetSequenceCartContentRoomCardElement) => (
            <BifrostGroupBookingSheetSequenceCartContentRoomCard
              key={
                bifrostGroupBookingSheetSequenceCartContentRoomCardElement.id
              }
              {...bifrostGroupBookingSheetSequenceCartContentRoomCardElement}
            />
          )
        )}
        <BifrostGroupBookingSheetSequenceCartContentAddCard
          title="room"
          onClick={() => {
            setEditor({
              type: "add-room",
              title: "Add Room",
              name: "New Room",
            });
          }}
        />
      </BifrostGroupBookingSheetSequenceCartContentScroll>

      <BifrostGroupBookingSheetSequenceCartContentScroll
        title="Events"
        description="You have 1 event added to your itinerary."
      >
        {events.map((event) => (
          <BifrostGroupBookingSheetSequenceCartContentEventCard
            key={event.id}
            {...event}
          />
        ))}
        <BifrostGroupBookingSheetSequenceCartContentAddCard
          title="event"
          onClick={() => {
            setEditor({
              type: "add-event",
              title: "Add Event",
              name: "New Event",
            });
          }}
        />
      </BifrostGroupBookingSheetSequenceCartContentScroll>
    </div>
  );
}

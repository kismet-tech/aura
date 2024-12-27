import React from "react";
import { RenderableItineraryHotelRoomOffer, RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { ResponsiveGrid } from "@/components/atoms/ResponsiveGrid";
import { RoomCard } from "@/components/atoms/RoomCard";
import { EventOfferListItem } from "@/components/atoms/EventOfferListItem";
import { Button } from "@/components/shadcn/button";
import { LockIcon } from "lucide-react";

interface BifrostGroupBookingCheckoutBodyProps {
  availableHotelRooms: RenderableItineraryHotelRoomOffer[];
  availableEventOffers: RenderableItineraryEventOffer[];
  variant?: "host" | "attendee" | "saas";
  isLoggedIn?: boolean;
  onClickLogin: () => void;
  onClickUpdateHotelRoomCountInCart: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => void;
  onClickEventOffer: ({ eventOfferId }: { eventOfferId: string }) => void;
  onEventRSVP?: (status: "yes" | "no" | "maybe" | null) => void;
  currentRSVP?: "yes" | "no" | "maybe" | null;
  onDescriptionEdit?: (description: string) => void;
  onRoomClick?: (room: RenderableItineraryHotelRoomOffer) => void;
}

export function BifrostGroupBookingCheckoutBody({
  availableHotelRooms,
  availableEventOffers,
  variant = "attendee",
  isLoggedIn = false,
  onClickLogin,
  onClickUpdateHotelRoomCountInCart,
  onClickEventOffer,
  onEventRSVP,
  currentRSVP,
  onDescriptionEdit,
  onRoomClick,
}: BifrostGroupBookingCheckoutBodyProps) {
  const shouldShowEvents = variant !== "attendee" || isLoggedIn;
  const hasEvents = availableEventOffers?.length > 0;

  return (
    <div className="space-y-8">
      {/* Events Section */}
      {(hasEvents || variant === "attendee") && (
        <div>
          <h2 className="text-xl font-medium mb-4">Event Details</h2>
          {variant === "attendee" && !isLoggedIn ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <LockIcon className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Log in to View Events</h3>
              <p className="text-gray-600 mb-4">
                Please log in to see the events you're invited to and manage your RSVPs.
              </p>
              <Button onClick={onClickLogin} className="rounded-full">
                Log In
              </Button>
            </div>
          ) : (
            hasEvents && (
              <div className="space-y-4">
                {availableEventOffers.map((event) => (
                  <EventOfferListItem
                    key={event.eventOfferId}
                    eventOffer={event}
                    variant={variant}
                    onClick={onClickEventOffer}
                    onRSVP={variant === "attendee" ? onEventRSVP : undefined}
                    currentRSVP={variant === "attendee" ? currentRSVP : undefined}
                    onDescriptionEdit={variant === "host" ? onDescriptionEdit : undefined}
                  />
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* Rooms Section */}
      <ResponsiveGrid
        title="Available Rooms"
        description="Select the number of rooms you'd like to reserve"
        itemClassName="min-w-[300px]"
      >
        {availableHotelRooms.map((room) => (
          <RoomCard
            key={room.hotelRoomOfferId}
            room={room}
            variant={variant}
            onUpdateCount={(updatedCount) =>
              onClickUpdateHotelRoomCountInCart({
                updatedCountOffered: updatedCount,
                hotelRoomOfferId: room.hotelRoomOfferId,
              })
            }
            onClick={onRoomClick}
          />
        ))}
      </ResponsiveGrid>
    </div>
  );
}

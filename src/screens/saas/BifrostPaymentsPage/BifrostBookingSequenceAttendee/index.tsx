import React from "react";
import {
  BifrostGroupBookingCheckoutSessionSummary,
  RenderableItineraryHotelRoomOffer,
} from "@kismet_ai/foundation";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/shadcn/sheet";
import { Button } from "@/components/shadcn/button";
import { BifrostSelectRoomAttendee } from "../components/BifrostSelectRoomAttendee";

export interface BifrostBookingSequenceAttendeeProps {
  selectedRoom: RenderableItineraryHotelRoomOffer;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
  onAddToCart?: () => void;
}

export function BifrostBookingSequenceAttendee({
  selectedRoom,
  checkoutSessionSummary,
  onAddToCart,
}: BifrostBookingSequenceAttendeeProps) {
  return (
    <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Select Room</SheetTitle>
      </SheetHeader>
      <div className="mt-6">
        <BifrostSelectRoomAttendee
          name={selectedRoom.hotelRoomName}
          price={selectedRoom.offerPriceInCents / 100}
          originalPrice={selectedRoom.listPriceInCents / 100}
          quantity={selectedRoom.countOffered}
          imageUrl={selectedRoom.heroImageUrl}
          checkoutSessionSummary={checkoutSessionSummary}
          roomsInCart={selectedRoom.countOffered}
          hotelRoomDescription={selectedRoom.hotelRoomDescription}
        />
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={onAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </SheetContent>
  );
}

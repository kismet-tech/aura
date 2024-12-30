import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BifrostBookingSequenceAttendee } from "./index";
import { Sheet } from "@/components/shadcn/sheet";

const meta: Meta<typeof BifrostBookingSequenceAttendee> = {
  title: "screens/saas/BifrostPaymentsPage/BifrostBookingSequenceAttendee",
  component: BifrostBookingSequenceAttendee,
  decorators: [
    (Story) => (
      <Sheet defaultOpen>
        <Story />
      </Sheet>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BifrostBookingSequenceAttendee>;

const mockRoom = {
  hotelRoomOfferId: "1",
  hotelRoomName: "Deluxe King Room",
  hotelRoomDescription: "A spacious room with a king-sized bed",
  verboseHotelRoomDescription:
    "Luxurious room featuring a king-sized bed, modern amenities, and city views",
  offerPriceInCents: 20000,
  listPriceInCents: 25000,
  countOffered: 2,
  countAvailable: 5,
  heroImageUrl:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
  hotelRoomImageUrls: [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
  ],
  hotelRoomId: "room-1",
};

const mockCheckoutSessionSummary = {
  groupBookingCheckoutSessionId: "session-1",
  groupBookingCheckoutSessionTitle: "Summer Wedding 2024",
  groupBookingCheckoutSessionHeroImageUrl: "https://example.com/hero.jpg",
  hotelName: "Grand Hotel",
  groupBookingCheckoutSessionCalendarDateRange: {
    startCalendarDate: {
      year: 2024,
      month: 6,
      day: 15,
    },
    endCalendarDate: {
      year: 2024,
      month: 6,
      day: 17,
    },
  },
};

export const Default: Story = {
  args: {
    selectedRoom: mockRoom as any,
    checkoutSessionSummary: mockCheckoutSessionSummary,
    onAddToCart: () => console.log("Add to cart clicked"),
  },
};

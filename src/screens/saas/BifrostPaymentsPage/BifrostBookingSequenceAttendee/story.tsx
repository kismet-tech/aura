import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BifrostBookingSequenceAttendee } from "./index";
import { Sheet } from "@/components/shadcn/sheet";

// Local type definitions
interface RenderableItineraryHotelRoomOffer {
  hotelRoomOfferId: string;
  hotelRoomName: string;
  hotelRoomDescription: string;
  verboseHotelRoomDescription: string;
  offerPriceInCents: number;
  listPriceInCents: number;
  countOffered: number;
  countAvailable: number;
  heroImageUrl: string;
  hotelRoomImageUrls: string[];
  calendarDateRange: {
    startDate: string;
    endDate: string;
  };
  runOfHouseDetails: {
    isRunOfHouse: boolean;
    runOfHouseRoomTypes: string[];
  };
}

interface CalendarDate {
  year: number;
  month: number;
  day: number;
  timeZone: string;
}

interface CheckoutSessionSummary {
  totalPriceInCents: number;
  numberOfNights: number;
  numberOfRooms: number;
  startDate: string;
  endDate: string;
  hotelName: string;
  groupBookingCheckoutSessionHeroImageUrl: string;
  groupBookingCheckoutSessionTitle: string;
  groupBookingCheckoutSessionCalendarDateRange: {
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
  };
}

interface Props {
  selectedRoom?: RenderableItineraryHotelRoomOffer;
  checkoutSessionSummary?: CheckoutSessionSummary;
  onAddToCart: () => void;
}

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

const mockRoom: RenderableItineraryHotelRoomOffer = {
  hotelRoomOfferId: "mock-room-1",
  hotelRoomName: "Deluxe Ocean View",
  hotelRoomDescription: "Spacious room with ocean views",
  verboseHotelRoomDescription: "Detailed description of the room...",
  offerPriceInCents: 29900,
  listPriceInCents: 39900,
  countOffered: 1,
  countAvailable: 5,
  heroImageUrl: "https://example.com/room.jpg",
  hotelRoomImageUrls: ["https://example.com/room1.jpg", "https://example.com/room2.jpg"],
  calendarDateRange: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000).toISOString()
  },
  runOfHouseDetails: {
    isRunOfHouse: false,
    runOfHouseRoomTypes: []
  }
};

const mockCheckoutSessionSummary: CheckoutSessionSummary = {
  totalPriceInCents: 29900,
  numberOfNights: 2,
  numberOfRooms: 1,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 172800000).toISOString(),
  hotelName: "Grand Hotel",
  groupBookingCheckoutSessionHeroImageUrl: "https://example.com/hero.jpg",
  groupBookingCheckoutSessionTitle: "Summer Group Booking",
  groupBookingCheckoutSessionCalendarDateRange: {
    startCalendarDate: {
      year: 2024,
      month: 3,
      day: 15,
      timeZone: "America/New_York"
    },
    endCalendarDate: {
      year: 2024,
      month: 3,
      day: 17,
      timeZone: "America/New_York"
    }
  }
};

export const Default: Story = {
  args: {
    selectedRoom: mockRoom,
    checkoutSessionSummary: mockCheckoutSessionSummary,
    onAddToCart: () => console.log("Add to cart clicked"),
  },
};

export const NoRoomSelected: Story = {
  args: {
    checkoutSessionSummary: mockCheckoutSessionSummary,
    onAddToCart: () => console.log("Add to cart clicked"),
  },
}; 
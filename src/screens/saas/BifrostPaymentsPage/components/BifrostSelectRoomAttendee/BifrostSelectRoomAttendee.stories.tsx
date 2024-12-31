import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BifrostSelectRoomAttendee } from './index';

const meta = {
  title: 'Screens/BifrostPaymentsPage/BifrostSelectRoomAttendee',
  component: BifrostSelectRoomAttendee,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BifrostSelectRoomAttendee>;

export default meta;
type Story = StoryObj<typeof BifrostSelectRoomAttendee>;

const mockImages = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=600",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&h=600"
];

const mockRoomDetails = {
  hotelRoomOfferId: "room-123",
  countOffered: 0,
  countAvailable: 10,
  offerPriceInCents: 29900,
  listPriceInCents: 39900,
  hotelRoomName: "Deluxe Ocean View",
  hotelRoomDescription: "Experience luxury in our Deluxe Ocean View room. Wake up to breathtaking ocean vistas from your private balcony. The room features a king-size bed, marble bathroom with deep soaking tub, high-speed WiFi, and a dedicated workspace.",
  calendarDateRange: {
    startCalendarDate: { year: 2024, month: 6, day: 15 },
    endCalendarDate: { year: 2024, month: 6, day: 17 }
  },
  heroImageUrl: mockImages[0],
  hotelRoomImageUrls: mockImages,
  runOfHouseDetails: {
    isRunOfHouse: false
  }
};

const mockCheckoutSession = {
  hotelName: "Ocean View Resort",
  groupBookingCheckoutSessionHeroImageUrl: mockImages[0],
  groupBookingCheckoutSessionTitle: "Summer Group Booking",
  groupBookingCheckoutSessionCalendarDateRange: {
    startCalendarDate: { year: 2024, month: 6, day: 15 },
    endCalendarDate: { year: 2024, month: 6, day: 17 }
  }
};

export const Default: Story = {
  args: {
    name: "Deluxe Ocean View",
    price: 299,
    originalPrice: 399,
    quantity: 10,
    imageUrl: mockImages[0],
    images: mockImages,
    roomsInCart: 0,
    hotelRoomDescription: mockRoomDetails.hotelRoomDescription
  }
};

export const WithDiscount: Story = {
  args: {
    ...Default.args,
    price: 299,
    originalPrice: 399,
    roomsInCart: 2
  }
};

export const NoDiscount: Story = {
  args: {
    ...Default.args,
    price: 399,
    originalPrice: 399,
    roomsInCart: 0
  }
};

export const WithDates: Story = {
  args: {
    ...Default.args,
    checkoutSessionSummary: mockCheckoutSession
  }
};

export const SingleImage: Story = {
  args: {
    ...Default.args,
    images: [mockImages[0]]
  }
}; 
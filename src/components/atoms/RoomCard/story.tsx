import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { RoomCard } from ".";

const meta: Meta<typeof RoomCard> = {
  title: "Atoms/RoomCard",
  component: RoomCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RoomCard>;

const mockRoom = {
  hotelRoomOfferId: "123",
  hotelRoomName: "Deluxe King Room",
  hotelRoomDescription: "A luxurious king room with city views",
  verboseHotelRoomDescription: "Experience luxury in our spacious king room featuring stunning city views, modern amenities, and premium bedding.",
  offerPriceInCents: 19900,
  listPriceInCents: 24900,
  countOffered: 0,
  countAvailable: 5,
  heroImageUrl: "https://placehold.co/400x300",
  hotelRoomImageUrls: ["https://placehold.co/400x300"],
  runOfHouseDetails: {
    hotelRoomOfferId: "123",
    hotelRoomName: "Standard Room",
  },
};

const mockExecutiveSuite = {
  ...mockRoom,
  hotelRoomOfferId: "124",
  hotelRoomName: "Executive Suite",
  hotelRoomDescription: "Spacious suite with separate living area",
  offerPriceInCents: 29900,
  listPriceInCents: 34900,
  badgeText: "Upgrade Option",
  runOfHouseDetails: {
    hotelRoomOfferId: "124",
    hotelRoomName: "Executive Suite",
  },
};

const mockPresidentialSuite = {
  ...mockRoom,
  hotelRoomOfferId: "125",
  hotelRoomName: "Presidential Suite",
  hotelRoomDescription: "Our most luxurious accommodation",
  offerPriceInCents: 49900,
  listPriceInCents: 59900,
  badgeText: "Upgrade Option",
  runOfHouseDetails: {
    hotelRoomOfferId: "125",
    hotelRoomName: "Presidential Suite",
  },
};

export const HostView: Story = {
  args: {
    room: mockRoom,
    variant: "host",
    onUpdateCount: (count: number) => {
      console.log(`Count updated to: ${count}`);
    },
  },
};

export const ExecutiveSuiteHostView: Story = {
  args: {
    room: mockExecutiveSuite,
    variant: "host",
    onUpdateCount: (count: number) => {
      console.log(`Count updated to: ${count}`);
    },
  },
};

export const PresidentialSuiteHostView: Story = {
  args: {
    room: mockPresidentialSuite,
    variant: "host",
    onUpdateCount: (count: number) => {
      console.log(`Count updated to: ${count}`);
    },
  },
};

export const AttendeeView: Story = {
  args: {
    room: mockRoom,
    variant: "attendee",
    onUpdateCount: (count: number) => {
      console.log(`Count updated to: ${count}`);
    },
  },
};

export const SaaSView: Story = {
  args: {
    room: mockRoom,
    variant: "saas",
    onUpdateCount: (count: number) => {
      console.log(`Count updated to: ${count}`);
    },
  },
}; 
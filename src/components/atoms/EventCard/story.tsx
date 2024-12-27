import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { EventCard } from ".";
import { HotelEventOfferStatus, VenueOfferPricingType } from "@kismet_ai/foundation";

const meta: Meta<typeof EventCard> = {
  title: "Atoms/EventCard",
  component: EventCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

const mockEvent = {
  eventOfferId: "123",
  eventOfferName: "Rehearsal Dinner",
  startDateTime: "2024-12-19T19:00:00Z",
  endDateTime: "2024-12-19T22:00:00Z",
  status: HotelEventOfferStatus.TENTATIVE,
  numberOfGuests: 60,
  imageUrl: "https://placehold.co/400x300",
  isEventOfferPriceEnabled: false,
  eventOfferPriceInCents: 700000,
  venueOffers: [
    {
      venueOfferId: "venue-1",
      venueName: "Grand Ballroom",
      pricingInfo: {
        priceInCents: 700000,
        pricingType: VenueOfferPricingType.ALT_FOOD_BEV_MIN,
      },
    },
  ],
  details: {
    description: "Join us for a memorable evening",
  },
};

const mockUpgradeEvent = {
  ...mockEvent,
  eventOfferId: "124",
  eventOfferName: "Wedding Reception",
  numberOfGuests: 100,
  eventOfferPriceInCents: 1000000,
  badgeText: "Upgrade Option",
  status: HotelEventOfferStatus.TENTATIVE,
};

export const HostView: Story = {
  args: {
    event: mockEvent,
    variant: "host",
    onClick: () => {
      console.log("Event clicked");
    },
  },
};

export const UpgradeHostView: Story = {
  args: {
    event: mockUpgradeEvent,
    variant: "host",
    onClick: () => {
      console.log("Event clicked");
    },
  },
};

export const AttendeeView: Story = {
  args: {
    event: mockEvent,
    variant: "attendee",
    onClick: () => {
      console.log("Event clicked");
    },
  },
};

export const SaaSView: Story = {
  args: {
    event: mockEvent,
    variant: "saas",
    onClick: () => {
      console.log("Event clicked");
    },
  },
}; 
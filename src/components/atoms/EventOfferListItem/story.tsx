import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { EventOfferListItem } from ".";
import { VenueOfferPricingType, HotelEventOfferStatus, RenderableItineraryEventOffer } from "@kismet_ai/foundation";

const meta: Meta<typeof EventOfferListItem> = {
  title: "Atoms/EventOfferListItem",
  component: EventOfferListItem,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EventOfferListItem>;

const mockEvent: RenderableItineraryEventOffer = {
  eventOfferId: "123",
  eventOfferName: "Rehearsal Dinner",
  startDateTime: "2024-12-19T19:00:00Z",
  endDateTime: "2024-12-19T22:00:00Z",
  status: HotelEventOfferStatus.TENTATIVE,
  numberOfGuests: 60,
  imageUrl: "https://placehold.co/400x300",
  isEventOfferPriceEnabled: false,
  eventOfferPriceInCents: 700000,
  eventOfferListPriceInCents: 100000,
  venueOffers: [
    {
      venueOfferId: "venue-1",
      venueName: "Grand Ballroom",
      pricingInfo: {
        pricingType: VenueOfferPricingType.ALT_FOOD_BEV_MIN,
        offerPriceInCents: 700000,
        offerListPriceInCents: 100000,
      },
    },
  ],
  details: {
    description: "Join us for a memorable evening",
  },
};

export const HostView: Story = {
  args: {
    eventOffer: mockEvent,
    variant: "host",
    onClick: ({ eventOfferId }) => {
      console.log("Event clicked:", eventOfferId);
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] border border-gray-200 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export const AttendeeView: Story = {
  args: {
    eventOffer: {
      ...mockEvent,
      isEventOfferPriceEnabled: true,
    },
    variant: "attendee",
    onClick: ({ eventOfferId }) => {
      console.log("Event clicked:", eventOfferId);
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] border border-gray-200 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export const SaaSView: Story = {
  args: {
    eventOffer: mockEvent,
    variant: "saas",
    onClick: ({ eventOfferId }) => {
      console.log("Event clicked:", eventOfferId);
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] border border-gray-200 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
}; 
import { Meta, StoryObj } from "@storybook/react";
import {
  AlternativeItineraryOfferSelector,
  AlternativeItineraryOfferSelectorProps,
} from ".";

import React from "react";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof AlternativeItineraryOfferSelector> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/AlternativeItineraryOfferSelector",
  component: AlternativeItineraryOfferSelector,
};
export default meta;

type Story = StoryObj<typeof AlternativeItineraryOfferSelector>;

const exampleOneArguments: AlternativeItineraryOfferSelectorProps = {
  renderableItineraryOffers: [
    mockRenderableItineraryOfferOne,
    mockRenderableItineraryOfferTwo,
    mockRenderableItineraryOfferThree,
    mockRenderableItineraryOfferFour,
  ],
  onSelectAlternativeItineraryOffer: ({
    itineraryOfferId,
  }: {
    itineraryOfferId: string;
  }) => {
    console.log(`Selected itinerary offer: ${itineraryOfferId}`);
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <AlternativeItineraryOfferSelector {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

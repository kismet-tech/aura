import { Meta, StoryObj } from "@storybook/react";
import {
  AlternativeItineraryOfferSelector,
  AlternativeItineraryOfferSelectorProps,
} from ".";

import React from "react";
import { AppViewport } from "@/components/atoms/AppViewport";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

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
      <AppViewport>
        <div className="h-32">
          <AlternativeItineraryOfferSelector {...args} />
        </div>
      </AppViewport>
    );
  },
  args: exampleOneArguments,
};

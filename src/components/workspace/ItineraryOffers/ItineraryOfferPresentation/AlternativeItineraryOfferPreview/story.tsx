import { Meta, StoryObj } from "@storybook/react";
import {
  AlternativeItineraryOfferPreview,
  AlternativeItineraryOfferPreviewProps,
} from ".";
import React from "react";
import {
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof AlternativeItineraryOfferPreview> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/AlternativeItineraryOfferPreview",
  component: AlternativeItineraryOfferPreview,
};
export default meta;

type Story = StoryObj<typeof AlternativeItineraryOfferPreview>;

const exampleOneArguments: AlternativeItineraryOfferPreviewProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
  itineraryOfferIndex: 0,
  onClick: () => {
    console.log("Clicked");
  },
};

const exampleTwoArguments: AlternativeItineraryOfferPreviewProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferTwo,
  itineraryOfferIndex: 1,
  onClick: () => {
    console.log("Clicked");
  },
};

export const Example_One: Story = {
  render: (args) => {
    return <AlternativeItineraryOfferPreview {...args} />;
  },
  args: exampleOneArguments,
};

export const Example_Two: Story = {
  render: (args) => {
    return <AlternativeItineraryOfferPreview {...args} />;
  },
  args: exampleTwoArguments,
};

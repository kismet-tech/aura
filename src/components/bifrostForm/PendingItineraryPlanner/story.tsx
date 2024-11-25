import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PendingItineraryPlanner, PendingItineraryPlannerProps } from ".";
import { mockRenderablePendingItineraryTwo } from "@/mockData/bifrost/mockRenderablePendingItineraries";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof PendingItineraryPlanner> = {
  title: "BifrostForm/PendingItineraryPlanner",
  component: PendingItineraryPlanner,
};
export default meta;

type Story = StoryObj<typeof PendingItineraryPlanner>;

const StoryWrapper = () => {
  const dynamicArgs: PendingItineraryPlannerProps = {
    renderablePendingItinerary: mockRenderablePendingItineraryTwo,
    itineraryOfferId: mockRenderableItineraryOfferOne.itineraryOfferId,
    renderableItineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
      mockRenderableItineraryOfferFour,
    ],
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <PendingItineraryPlanner {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

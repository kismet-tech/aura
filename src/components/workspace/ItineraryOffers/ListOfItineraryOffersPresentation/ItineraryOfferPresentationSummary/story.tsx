import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { mockRenderableItineraryOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";
import {
  ItineraryOfferPresentationSummary,
  ItineraryOfferPresentationSummaryProps,
} from ".";

const meta: Meta<typeof ItineraryOfferPresentationSummary> = {
  title:
    "ItineraryOffer/ListOfItineraryOffersPresentation/ItineraryOfferPresentationSummary",
  component: ItineraryOfferPresentationSummary,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferPresentationSummary>;

const StoryWrapper = () => {
  const dynamicArgs: ItineraryOfferPresentationSummaryProps = {
    renderableItineraryOffer: mockRenderableItineraryOfferOne,
    itineraryOfferIndex: 0,
    onClick: () => {
      console.log("Clicked");
    },
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
      <ItineraryOfferPresentationSummary {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: (args) => <StoryWrapper />,
  args: {},
};
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ListOfItineraryOffersPresentation,
  ListOfItineraryOffersPresentationProps,
} from ".";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ListOfItineraryOffersPresentation> = {
  title:
    "ItineraryOffer/ListOfItineraryOffersPresentation/ListOfItineraryOffersPresentation",
  component: ListOfItineraryOffersPresentation,
};
export default meta;

type Story = StoryObj<typeof ListOfItineraryOffersPresentation>;

const StoryWrapper = () => {
  const dynamicArgs: ListOfItineraryOffersPresentationProps = {
    renderableItineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
      mockRenderableItineraryOfferFour,
    ],
    onClick: ({ itineraryOfferId }: { itineraryOfferId: string }) => {
      console.log(itineraryOfferId);
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
      <ListOfItineraryOffersPresentation {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: (args) => <StoryWrapper />,
  args: {},
};

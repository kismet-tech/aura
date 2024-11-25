import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ItineraryOfferPresentation, ItineraryOfferPresentationProps } from ".";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof ItineraryOfferPresentation> = {
  title: "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferPresentation",
  component: ItineraryOfferPresentation,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferPresentation>;

const StoryWrapper = (props: ItineraryOfferPresentationProps) => {
  const [selectedItineraryOfferId, setSelectedItineraryOfferId] = useState(
    mockRenderableItineraryOfferOne.itineraryOfferId
  );

  const dynamicArgs: ItineraryOfferPresentationProps = {
    ...props,
    itineraryOfferId: selectedItineraryOfferId,
    onSelectAlternativeItineraryOffer: ({
      itineraryOfferId,
    }: {
      itineraryOfferId: string;
    }) => {
      console.log(`Selected itinerary offer: ${itineraryOfferId}`);
      setSelectedItineraryOfferId(itineraryOfferId);
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
      <ItineraryOfferPresentation {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: (args) => <StoryWrapper {...args} />,
  args: {
    renderableItineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
      mockRenderableItineraryOfferFour,
    ],
  },
};

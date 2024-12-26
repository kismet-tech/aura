import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferPresentationHeader,
  ItineraryOfferPresentationHeaderProps,
} from ".";
import React from "react";
import { mockRenderableItineraryOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ItineraryOfferPresentationHeader> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferPresentationHeader",
  component: ItineraryOfferPresentationHeader,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferPresentationHeader>;

const exampleOneArguments: ItineraryOfferPresentationHeaderProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
  itineraryOfferIndex: 0,
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ItineraryOfferPresentationHeader {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

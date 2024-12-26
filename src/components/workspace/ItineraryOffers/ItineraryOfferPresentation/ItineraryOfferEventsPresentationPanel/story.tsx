import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferEventsPresentationPanel,
  ItineraryOfferEventsPresentationPanelProps,
} from ".";
import React from "react";
import { mockRenderableItineraryOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ItineraryOfferEventsPresentationPanel> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferEventsPresentationPanel",
  component: ItineraryOfferEventsPresentationPanel,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferEventsPresentationPanel>;

const exampleOneArguments: ItineraryOfferEventsPresentationPanelProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ItineraryOfferEventsPresentationPanel {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

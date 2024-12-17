import { Meta, StoryObj } from "@storybook/react";
import { BifrostItineraryOffersLoadingPanel } from ".";
import React from "react";

const meta: Meta<typeof BifrostItineraryOffersLoadingPanel> = {
  title: "Atoms/Icons/BifrostItineraryOffersLoadingPanel",
  component: BifrostItineraryOffersLoadingPanel,
};
export default meta;

type Story = StoryObj<typeof BifrostItineraryOffersLoadingPanel>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <BifrostItineraryOffersLoadingPanel />
      </div>
    );
  },
  args: {},
};

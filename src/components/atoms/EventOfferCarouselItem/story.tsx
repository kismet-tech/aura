import { Meta, StoryObj } from "@storybook/react";
import { EventOfferCarouselItem, EventOfferCarouselItemProps } from ".";
import React from "react";
import { mockRenderableItineraryEventOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/RenderableItineraryEventOffer";

const meta: Meta<typeof EventOfferCarouselItem> = {
  title: "ItineraryOffer/EventOfferCarouselItem",
  component: EventOfferCarouselItem,
};
export default meta;

type Story = StoryObj<typeof EventOfferCarouselItem>;

const exampleOneArguments: EventOfferCarouselItemProps = {
  eventOffer: mockRenderableItineraryEventOfferOne,
  onClick: () => {
    console.log("Clicked");
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <EventOfferCarouselItem {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferRoomsPresentationPanel,
  ItineraryOfferRoomsPresentationPanelProps,
} from ".";
import React from "react";
import { mockRenderableItineraryOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ItineraryOfferRoomsPresentationPanel> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferRoomsPresentationPanel",
  component: ItineraryOfferRoomsPresentationPanel,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferRoomsPresentationPanel>;

const exampleOneArguments: ItineraryOfferRoomsPresentationPanelProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
  onClickHotelRoomCarouselItem: ({
    hotelRoomOfferId,
  }: {
    hotelRoomOfferId: string;
  }) => {
    console.log(`Clicked on hotel room carousel item: ${hotelRoomOfferId}`);
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ItineraryOfferRoomsPresentationPanel {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

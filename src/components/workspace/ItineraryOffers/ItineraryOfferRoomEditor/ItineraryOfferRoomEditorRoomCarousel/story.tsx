import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferRoomEditorRoomCarousel,
  ItineraryOfferRoomEditorRoomCarouselProps,
} from ".";

import React from "react";
import { mockRenderableItineraryOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof ItineraryOfferRoomEditorRoomCarousel> = {
  title:
    "ItineraryOffer/ItineraryOfferRoomEditor/ItineraryOfferRoomEditorRoomCarousel",
  component: ItineraryOfferRoomEditorRoomCarousel,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferRoomEditorRoomCarousel>;

const exampleOneArguments: ItineraryOfferRoomEditorRoomCarouselProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
  selectedHotelRoomId:
    mockRenderableItineraryOfferOne.hotelRoomOffers[0].hotelRoomId,
  setSelectedHotelRoomId: () => {},
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ItineraryOfferRoomEditorRoomCarousel {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

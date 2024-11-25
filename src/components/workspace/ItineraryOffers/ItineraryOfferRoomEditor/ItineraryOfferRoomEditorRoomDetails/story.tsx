import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferRoomEditorRoomDetails,
  ItineraryOfferRoomEditorRoomDetailsProps,
} from ".";

import React from "react";
import { mockRenderableItineraryHotelRoomOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof ItineraryOfferRoomEditorRoomDetails> = {
  title:
    "ItineraryOffer/ItineraryOfferRoomEditor/ItineraryOfferRoomEditorRoomDetails",
  component: ItineraryOfferRoomEditorRoomDetails,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferRoomEditorRoomDetails>;

const exampleOneArguments: ItineraryOfferRoomEditorRoomDetailsProps = {
  renderableItineraryHotelRoomOffer: mockRenderableItineraryHotelRoomOfferOne,
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ItineraryOfferRoomEditorRoomDetails {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

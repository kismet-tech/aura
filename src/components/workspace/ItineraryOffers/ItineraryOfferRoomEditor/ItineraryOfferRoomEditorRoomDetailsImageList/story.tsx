import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferRoomEditorRoomDetailsImageList,
  ItineraryOfferRoomEditorRoomDetailsImageListProps,
} from ".";

import React from "react";
import { mockRenderableItineraryHotelRoomOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/RenderableItineraryHotelRoomOffer";

const meta: Meta<typeof ItineraryOfferRoomEditorRoomDetailsImageList> = {
  title:
    "ItineraryOffer/ItineraryOfferRoomEditor/ItineraryOfferRoomEditorRoomDetailsImageList",
  component: ItineraryOfferRoomEditorRoomDetailsImageList,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferRoomEditorRoomDetailsImageList>;

const exampleOneArguments: ItineraryOfferRoomEditorRoomDetailsImageListProps = {
  renderableItineraryHotelRoomOffer: mockRenderableItineraryHotelRoomOfferOne,
};

export const Example: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          border: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <ItineraryOfferRoomEditorRoomDetailsImageList {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

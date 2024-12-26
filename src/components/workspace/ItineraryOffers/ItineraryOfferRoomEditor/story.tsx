import { Meta, StoryObj } from "@storybook/react";
import { ItineraryOfferRoomEditor, ItineraryOfferRoomEditorProps } from ".";

import React from "react";
import { mockRenderableItineraryOfferOne } from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ItineraryOfferRoomEditor> = {
  title: "ItineraryOffer/ItineraryOfferRoomEditor/ItineraryOfferRoomEditor",
  component: ItineraryOfferRoomEditor,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferRoomEditor>;

const exampleOneArguments: ItineraryOfferRoomEditorProps = {
  renderableItineraryOffer: mockRenderableItineraryOfferOne,
  onClickUpdateItineraryOfferHotelRoomCount: ({
    itineraryOfferId,
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => {
    console.log(
      `Requested to update itineraryOfferId '${itineraryOfferId}' hotelRoomOfferId '${hotelRoomOfferId}' to ${updatedCountOffered}`
    );
  },
  onClickExit: () => {
    console.log(`Exiting component`);
  },
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
        <ItineraryOfferRoomEditor {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

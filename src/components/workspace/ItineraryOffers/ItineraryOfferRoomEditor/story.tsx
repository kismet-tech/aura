import { Meta, StoryObj } from "@storybook/react";
import { ItineraryOfferRoomEditor, ItineraryOfferRoomEditorProps } from ".";

import React from "react";
import { mockRenderableItineraryOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";

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
    hotelRoomId,
  }: {
    itineraryOfferId: string;
    updatedCountOffered: number;
    hotelRoomId: string;
  }) => {
    console.log(
      `Requested to update itineraryOfferId '${itineraryOfferId}' hotelRoomId '${hotelRoomId}' to ${updatedCountOffered}`
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

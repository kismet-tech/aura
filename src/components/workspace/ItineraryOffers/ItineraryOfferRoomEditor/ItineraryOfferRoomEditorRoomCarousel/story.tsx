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
  selectedHotelRoomOfferId:
    mockRenderableItineraryOfferOne.hotelRoomOffers[0].hotelRoomOfferId,
  setSelectedHotelRoomOfferId: () => {},
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
      `Set itineraryOfferId '${itineraryOfferId}' hotelRoomId '${hotelRoomOfferId}' to ${updatedCountOffered}`
    );
  },
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

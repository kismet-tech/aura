import { Meta, StoryObj } from "@storybook/react";
import { HotelRoomCarouselItem, HotelRoomCarouselItemProps } from ".";
import React from "react";
import { mockRenderableItineraryHotelRoomOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof HotelRoomCarouselItem> = {
  title: "ItineraryOffer/HotelRoomCarouselItem",
  component: HotelRoomCarouselItem,
};
export default meta;

type Story = StoryObj<typeof HotelRoomCarouselItem>;

const exampleOneArguments: HotelRoomCarouselItemProps = {
  hotelRoomOffer: mockRenderableItineraryHotelRoomOfferOne,
  onClick: () => {
    console.log("Clicked");
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <HotelRoomCarouselItem {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

import { Meta, StoryObj } from "@storybook/react";
import { AddHotelRoomCarouselItem, AddHotelRoomCarouselItemProps } from ".";
import React from "react";
import { mockRenderableItineraryHotelRoomOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof AddHotelRoomCarouselItem> = {
  title: "ItineraryOffer/AddHotelRoomCarouselItem",
  component: AddHotelRoomCarouselItem,
};
export default meta;

type Story = StoryObj<typeof AddHotelRoomCarouselItem>;

const exampleOneArguments: AddHotelRoomCarouselItemProps = {
  onClick: () => {
    console.log("Clicked");
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <AddHotelRoomCarouselItem {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

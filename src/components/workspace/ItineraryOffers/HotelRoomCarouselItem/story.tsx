import { Meta, StoryObj } from "@storybook/react";
import {
  HotelRoomCarouselItem,
  HotelRoomCarouselItemIndicatorLabel,
  HotelRoomCarouselItemProps,
} from ".";
import React from "react";
import { mockRenderableItineraryHotelRoomOfferOne } from "@/mockData/bifrost/mockRenderableItineraryOffers";
import { mockRunOfHouseRenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";

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
  hotelRoomCarouselItemIndicatorLabel:
    HotelRoomCarouselItemIndicatorLabel.COUNT_AVAILABLE_VALUE_ONLY,
  isCountEditable: true,
  onClickUpdateItineraryOfferHotelRoomCount: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => {
    () => {
      console.log(`Updated ${hotelRoomOfferId} to ${updatedCountOffered}`);
    };
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

const RunOfHouseExampleOneArguments: HotelRoomCarouselItemProps = {
  hotelRoomOffer: mockRunOfHouseRenderableItineraryHotelRoomOffer,
  onClick: () => {
    console.log("Clicked");
  },
  hotelRoomCarouselItemIndicatorLabel:
    HotelRoomCarouselItemIndicatorLabel.COUNT_AVAILABLE_VALUE_ONLY,
  isCountEditable: true,
  onClickUpdateItineraryOfferHotelRoomCount: ({
    updatedCountOffered,
    hotelRoomOfferId,
  }: {
    updatedCountOffered: number;
    hotelRoomOfferId: string;
  }) => {
    () => {
      console.log(`Updated ${hotelRoomOfferId} to ${updatedCountOffered}`);
    };
  },
};

export const RunOfHouseExample: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <HotelRoomCarouselItem {...args} />
      </div>
    );
  },
  args: RunOfHouseExampleOneArguments,
};

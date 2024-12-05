import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostGroupBookingCheckoutBody } from ".";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import {
  mockRenderableItineraryHotelRoomOfferFive,
  mockRenderableItineraryHotelRoomOfferFour,
  mockRenderableItineraryHotelRoomOfferOne,
  mockRenderableItineraryHotelRoomOfferSix,
  mockRenderableItineraryHotelRoomOfferThree,
  mockRenderableItineraryHotelRoomOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof BifrostGroupBookingCheckoutBody> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingCheckoutBody",
  component: BifrostGroupBookingCheckoutBody,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutBody>;

const StoryWrapper = () => {
  const mockRenderableItineraryHotelRoomOffers: RenderableItineraryHotelRoomOffer[] =
    [
      mockRenderableItineraryHotelRoomOfferOne,
      mockRenderableItineraryHotelRoomOfferTwo,
      mockRenderableItineraryHotelRoomOfferThree,
      mockRenderableItineraryHotelRoomOfferFour,
      mockRenderableItineraryHotelRoomOfferFive,
      mockRenderableItineraryHotelRoomOfferSix,
    ];

  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockRenderableItineraryHotelRoomOffers.map(
      (offer: RenderableItineraryHotelRoomOffer) => {
        return {
          ...offer,
          countOffered: 0,
          countAvailable: offer.countOffered,
        };
      }
    );

  const [hotelRoomOffers, setHotelRoomOffers] = useState<
    RenderableItineraryHotelRoomOffer[]
  >(initialAvailableHotelRooms);

  return (
    <BifrostGroupBookingCheckoutBody
      availableHotelRooms={hotelRoomOffers}
      onClickUpdateHotelRoomCountInCart={() => {}}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

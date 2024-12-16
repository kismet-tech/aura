import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ItineraryOfferPresentationBody,
  ItineraryOfferPresentationBodyProps,
} from ".";
import {
  mockRenderableItineraryOfferFour,
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferTwo,
} from "@/mockData/bifrost/mockRenderableItineraryOffers";

const meta: Meta<typeof ItineraryOfferPresentationBody> = {
  title:
    "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferPresentationBody",
  component: ItineraryOfferPresentationBody,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferPresentationBody>;

const StoryWrapper = (props: ItineraryOfferPresentationBodyProps) => {
  const [selectedItineraryOfferId, setSelectedItineraryOfferId] = useState(
    mockRenderableItineraryOfferOne.itineraryOfferId
  );

  const dynamicArgs: ItineraryOfferPresentationBodyProps = {
    itineraryOfferId: selectedItineraryOfferId,
    renderableItineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
      mockRenderableItineraryOfferFour,
    ],
    onClickHotelRoom: ({ hotelRoomOfferId }: { hotelRoomOfferId: string }) => {
      console.log(`Clicked ${hotelRoomOfferId}`);
    },
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <ItineraryOfferPresentationBody {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: (args) => <StoryWrapper {...args} />,
  args: {},
};

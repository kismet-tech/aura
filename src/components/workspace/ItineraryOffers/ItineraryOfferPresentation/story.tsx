import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ItineraryOfferPresentation, ItineraryOfferPresentationProps } from ".";
import { AppViewport } from "@/components/atoms/AppViewport";
import { AppViewportScrollArea } from "@/components/atoms/AppViewportScrollArea";
import {
  mockRenderableItineraryOfferOne,
  mockRenderableItineraryOfferTwo,
  mockRenderableItineraryOfferThree,
  mockRenderableItineraryOfferFour,
} from "@kismet_ai/foundation/dist/models/bifrost/ItineraryOffer/RenderableItineraryOffer/mockData";

const meta: Meta<typeof ItineraryOfferPresentation> = {
  title: "ItineraryOffer/ItineraryOfferPresentation/ItineraryOfferPresentation",
  component: ItineraryOfferPresentation,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferPresentation>;

const StoryWrapper = () => {
  const [selectedItineraryOfferId, setSelectedItineraryOfferId] = useState(
    mockRenderableItineraryOfferOne.itineraryOfferId
  );

  const dynamicArgs: ItineraryOfferPresentationProps = {
    itineraryOfferId: selectedItineraryOfferId,
    onSelectAlternativeItineraryOffer: ({
      itineraryOfferId,
    }: {
      itineraryOfferId: string;
    }) => {
      console.log(`Selected itinerary offer: ${itineraryOfferId}`);
      setSelectedItineraryOfferId(itineraryOfferId);
    },
    renderableItineraryOffers: [
      mockRenderableItineraryOfferOne,
      mockRenderableItineraryOfferTwo,
      mockRenderableItineraryOfferThree,
      mockRenderableItineraryOfferFour,
    ],
    onClickHotelRoom: ({ hotelRoomOfferId }: { hotelRoomOfferId: string }) => {
      console.log(`Clicked ${hotelRoomOfferId}`);
    },
    onClickSelectItineraryOfferAndGoToPaymentsPage: ({
      itineraryOfferId,
    }: {
      itineraryOfferId: string;
    }) => {
      console.log(`Clicked go to payments page for ${itineraryOfferId}`);
    },
  };

  return (
    <AppViewport>
      <AppViewportScrollArea>
        <ItineraryOfferPresentation {...dynamicArgs} />
      </AppViewportScrollArea>
    </AppViewport>
  );
};

export const Example: Story = {
  render: (args) => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostGroupBookingCheckoutBody } from ".";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";

const meta: Meta<typeof BifrostGroupBookingCheckoutBody> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingCheckoutBody",
  component: BifrostGroupBookingCheckoutBody,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutBody>;

const StoryWrapper = () => {
  const initialAvailableHotelRooms: RenderableItineraryHotelRoomOffer[] =
    mockBifrostGroupBookingCheckoutCartOne.hotelRooms.map(
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

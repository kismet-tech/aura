import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BifrostGroupBookingCheckoutBody } from ".";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";

const meta: Meta<typeof BifrostGroupBookingCheckoutBody> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingCheckoutBody",
  component: BifrostGroupBookingCheckoutBody,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutBody>;

const StoryWrapper = () => {
  const availableHotelRooms: RenderableItineraryHotelRoomOffer[] = [
    {
      hotelRoomId: "jahldsfljkh",
      countOffered: 5,
      countAvailable: 6,
      offerPriceInCents: 10000,
      listPriceInCents: 15000,

      hotelRoomName: "Standard King",
      hotelRoomDescription: "Some description",
      verboseHotelRoomDescription: "Longer description",
      heroImageUrl:
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      hotelRoomImageUrls: [
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      ],
    },
    {
      hotelRoomId: "adsfdsaf",
      countOffered: 5,
      countAvailable: 6,
      offerPriceInCents: 10000,
      listPriceInCents: 15000,

      hotelRoomName: "Standard King",
      hotelRoomDescription: "Some description",
      verboseHotelRoomDescription: "Longer description",
      heroImageUrl:
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      hotelRoomImageUrls: [
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      ],
    },
    {
      hotelRoomId: "81923747aghew",
      countOffered: 5,
      countAvailable: 6,
      offerPriceInCents: 10000,
      listPriceInCents: 15000,

      hotelRoomName: "Standard King",
      hotelRoomDescription: "Some description",
      verboseHotelRoomDescription: "Longer description",
      heroImageUrl:
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      hotelRoomImageUrls: [
        "https://compote.slate.com/images/3a80009e-24e2-4bf0-9cd0-99ef4d4a5255.jpg?height=346&width=568",
      ],
    },
  ];

  return (
    <BifrostGroupBookingCheckoutBody
      availableHotelRooms={availableHotelRooms}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

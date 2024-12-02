import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BifrostGroupBookingCheckoutRootPage } from ".";
import { RenderableItineraryHotelRoomOffer } from "@/models/bifrost/RenderableItineraryOffer";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";

const meta: Meta<typeof BifrostGroupBookingCheckoutRootPage> = {
  title: "Applications/BifrostGroupBookingCheckoutRootPage",
  component: BifrostGroupBookingCheckoutRootPage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutRootPage>;

const StoryWrapper = () => {
  const cart: BifrostGroupBookingCheckoutCart = {
    hotelRooms: [],
  };

  const checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary = {
    hotelName: "Knollcroft",
    groupBookingCheckoutSessionHeroImageUrl:
      "https://www.benziger.com/wp-content/uploads/2024/04/Benziger2023HARVESTPARTYbyAlexanderRubin_0104-scaled.jpg",
    groupBookingCheckoutSessionTitle: "Rachel & Jack’s Wedding",
    groupBookingCheckoutSessionCalendarDateRange: {
      startCalendarDate: {
        day: 2,
        month: 1,
        year: 2025,
      },
      endCalendarDate: {
        day: 4,
        month: 1,
        year: 2025,
      },
    },
  };

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
    <BifrostGroupBookingCheckoutRootPage
      checkoutSessionSummary={checkoutSessionSummary}
      cart={cart}
      availableHotelRooms={availableHotelRooms}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

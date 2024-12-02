import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BifrostGroupBookingCheckoutHeader } from ".";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";

const meta: Meta<typeof BifrostGroupBookingCheckoutHeader> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingCheckoutHeader",
  component: BifrostGroupBookingCheckoutHeader,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingCheckoutHeader>;

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

  return (
    <BifrostGroupBookingCheckoutHeader
      cart={cart}
      checkoutSessionSummary={checkoutSessionSummary}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

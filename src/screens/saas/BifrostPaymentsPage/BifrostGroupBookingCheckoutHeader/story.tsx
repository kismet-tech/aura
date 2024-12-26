import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BifrostGroupBookingCheckoutHeader } from ".";
import { mockBifrostGroupBookingCheckoutSessionSummaryOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutSessionSummary/mockBifrostGroupBookingCheckoutSessionSummaries";
import { BifrostGroupBookingCheckoutCart } from "@kismet_ai/foundation";

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

  return (
    <BifrostGroupBookingCheckoutHeader
      onClickLogin={() => {
        console.log("Login clicked");
      }}
      onClickCart={() => {
        console.log(`Cart clicked`);
      }}
      cart={cart}
      checkoutSessionSummary={mockBifrostGroupBookingCheckoutSessionSummaryOne}
      authenticatedGuestUser={undefined}
    />
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

const LoadingStoryWrapper = () => {
  const cart: BifrostGroupBookingCheckoutCart = {
    hotelRooms: [],
  };

  const checkoutSessionSummary = undefined;

  return (
    <BifrostGroupBookingCheckoutHeader
      onClickLogin={() => {
        console.log("Login clicked");
      }}
      onClickCart={() => {
        console.log(`Cart clicked`);
      }}
      cart={cart}
      checkoutSessionSummary={checkoutSessionSummary}
      authenticatedGuestUser={undefined}
    />
  );
};

export const LoadingExample: Story = {
  render: () => <LoadingStoryWrapper />,
  args: {},
};

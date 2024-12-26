import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequenceCheckoutStage,
  BifrostGroupBookingSheetSequenceCheckoutStageProps,
} from ".";
import { mockCreatePaymentIntent } from "@/components/molecules/StripePaymentForm/mockCreatePaymentIntent";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";

const meta: Meta<typeof BifrostGroupBookingSheetSequenceCheckoutStage> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence/BifrostGroupBookingSheetSequenceCheckoutStage",
  component: BifrostGroupBookingSheetSequenceCheckoutStage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequenceCheckoutStage>;

const exampleOneArguments: BifrostGroupBookingSheetSequenceCheckoutStageProps =
  {
    initialAcceptedState: false,
    getStripePaymentIntent: async ({}: {}) => {
      const { clientSecret } = await mockCreatePaymentIntent({});
      return { clientSecret };
    },
    cart: mockBifrostGroupBookingCheckoutCartOne,
  };

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <BifrostGroupBookingSheetSequenceCheckoutStage {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

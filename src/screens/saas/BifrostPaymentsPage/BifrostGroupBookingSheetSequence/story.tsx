import React from "react";
import { Button } from "@/components/shadcn/button";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequence,
  BifrostGroupBookingSheetSequenceStage,
} from ".";
import { mockCreatePaymentIntent } from "@/components/molecules/StripePaymentForm/mockCreatePaymentIntent";
import { mockBifrostGroupBookingCheckoutSessionSummaryOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutSessionSummary/mockBifrostGroupBookingCheckoutSessionSummaries";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";

const meta: Meta<typeof BifrostGroupBookingSheetSequence> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence",
  component: BifrostGroupBookingSheetSequence,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequence>;

type Props = React.ComponentProps<typeof BifrostGroupBookingSheetSequence>;

function ExampleWrapper(props: Props) {
  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Sheet open>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <BifrostGroupBookingSheetSequence {...props} />
      </Sheet>
    </div>
  );
}

const cartExampleArguments: Props = {
  stage: BifrostGroupBookingSheetSequenceStage.CART,
  getStripePaymentIntent: async ({}: {}) => {
    const { clientSecret } = await mockCreatePaymentIntent({});
    return { clientSecret };
  },
  checkoutSessionSummary: mockBifrostGroupBookingCheckoutSessionSummaryOne,
  cart: mockBifrostGroupBookingCheckoutCartOne,
};

export const CartExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: cartExampleArguments,
};

const summaryExampleArguments: Props = {
  stage: BifrostGroupBookingSheetSequenceStage.SUMMARY,
  getStripePaymentIntent: async ({}: {}) => {
    const { clientSecret } = await mockCreatePaymentIntent({});
    return { clientSecret };
  },
  checkoutSessionSummary: mockBifrostGroupBookingCheckoutSessionSummaryOne,
  cart: mockBifrostGroupBookingCheckoutCartOne,
};

export const SummaryExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: summaryExampleArguments,
};

const checkoutExampleArguments: Props = {
  stage: BifrostGroupBookingSheetSequenceStage.CHECKOUT,
  getStripePaymentIntent: async ({}: {}) => {
    const { clientSecret } = await mockCreatePaymentIntent({});
    return { clientSecret };
  },
  checkoutSessionSummary: mockBifrostGroupBookingCheckoutSessionSummaryOne,
  cart: mockBifrostGroupBookingCheckoutCartOne,
};

export const CheckoutExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: checkoutExampleArguments,
};

import React from "react";
import { Button } from "@/components/shadcn/button";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequence,
  BifrostGroupBookingSheetSequenceProps,
  BifrostGroupBookingSheetSequenceStage,
} from ".";

const meta: Meta<typeof BifrostGroupBookingSheetSequence> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence",
  component: BifrostGroupBookingSheetSequence,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequence>;

function ExampleWrapper(props: BifrostGroupBookingSheetSequenceProps) {
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

const cartExampleArguments: BifrostGroupBookingSheetSequenceProps = {
  stage: BifrostGroupBookingSheetSequenceStage.CART,
};

export const CartExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: cartExampleArguments,
};

const summaryExampleArguments: BifrostGroupBookingSheetSequenceProps = {
  stage: BifrostGroupBookingSheetSequenceStage.SUMMARY,
};

export const SummaryExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: summaryExampleArguments,
};

const checkoutExampleArguments: BifrostGroupBookingSheetSequenceProps = {
  stage: BifrostGroupBookingSheetSequenceStage.CHECKOUT,
};

export const CheckoutExample: Story = {
  render: (args) => {
    return <ExampleWrapper {...args} />;
  },
  args: checkoutExampleArguments,
};

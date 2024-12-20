import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequenceCheckoutStage,
  BifrostGroupBookingSheetSequenceCheckoutStageProps,
} from ".";

const meta: Meta<typeof BifrostGroupBookingSheetSequenceCheckoutStage> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence/BifrostGroupBookingSheetSequenceCheckoutStage",
  component: BifrostGroupBookingSheetSequenceCheckoutStage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequenceCheckoutStage>;

const exampleOneArguments: BifrostGroupBookingSheetSequenceCheckoutStageProps =
  {
    setLocalStage: () => {},
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

import React from "react";
import { Button } from "@/components/shadcn/button";
import { Sheet, SheetTrigger } from "@/components/shadcn/sheet";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequenceCartStage,
  BifrostGroupBookingSheetSequenceCartStageProps,
} from ".";

const meta: Meta<typeof BifrostGroupBookingSheetSequenceCartStage> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence/BifrostGroupBookingSheetSequenceCartStage",
  component: BifrostGroupBookingSheetSequenceCartStage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequenceCartStage>;

const exampleOneArguments: BifrostGroupBookingSheetSequenceCartStageProps = {
  value: "input",
  setValue: () => {},
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <BifrostGroupBookingSheetSequenceCartStage />
      </div>
    );
  },
  args: exampleOneArguments,
};

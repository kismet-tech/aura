import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostGroupBookingSheetSequenceSummaryStage,
  BifrostGroupBookingSheetSequenceSummaryStageProps,
} from ".";
import { mockBifrostGroupBookingCheckoutCartOne } from "@kismet_ai/foundation/dist/models/saas/groups/BifrostGroupBookingCheckoutCart/mockBifrostGroupBookingCheckoutCarts";

const meta: Meta<typeof BifrostGroupBookingSheetSequenceSummaryStage> = {
  title:
    "Applications/BifrostGroupBookingCheckoutRootPage/BifrostGroupBookingSheetSequence/BifrostGroupBookingSheetSequenceSummaryStage",
  component: BifrostGroupBookingSheetSequenceSummaryStage,
};
export default meta;

type Story = StoryObj<typeof BifrostGroupBookingSheetSequenceSummaryStage>;

const exampleOneArguments: BifrostGroupBookingSheetSequenceSummaryStageProps = {
  cart: mockBifrostGroupBookingCheckoutCartOne,
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <BifrostGroupBookingSheetSequenceSummaryStage {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

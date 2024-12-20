import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import {
  BifrostInquirySubmittedIndicator,
  BifrostInquirySubmittedIndicatorProps,
} from ".";

const meta: Meta<typeof BifrostInquirySubmittedIndicator> = {
  title: "Atoms/BifrostInquirySubmittedIndicator",
  component: BifrostInquirySubmittedIndicator,
};
export default meta;

type Story = StoryObj<typeof BifrostInquirySubmittedIndicator>;

const exampleOneArguments: BifrostInquirySubmittedIndicatorProps = {
  assignedSalesAgentName: "Jason",
  hotelName: "Mews Grand",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <BifrostInquirySubmittedIndicator {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

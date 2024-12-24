import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { BifrostGroupBookingSheetSequenceContentSummaryLineItem } from ".";

const meta: Meta<
  typeof BifrostGroupBookingSheetSequenceContentSummaryLineItem
> = {
  title: "Components/BifrostGroupBookingSheetSequenceContentSummaryLineItem",
  component: BifrostGroupBookingSheetSequenceContentSummaryLineItem,
};

export default meta;
type Story = StoryObj<
  typeof BifrostGroupBookingSheetSequenceContentSummaryLineItem
>;

export const CompedKingSuite: Story = {
  args: {
    roomCount: 1,
    title: "King Suite",
    nights: 3,
    dates: "Dec 18 - 21, 2025",
    price: {
      amountInCents: 0,
      label: "room/night + taxes and fees",
    },
    keyTerms: [
      "Pending pickup of at least 25 rooms by guests and Confirmed Rehearsal Dinner Event. Otherwise $1,295/ night + taxes & fees.",
    ],
  },
};

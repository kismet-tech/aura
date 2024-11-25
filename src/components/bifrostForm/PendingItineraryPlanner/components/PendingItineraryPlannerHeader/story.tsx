import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  PendingItineraryPlannerHeader,
  PendingItineraryPlannerHeaderProps,
} from ".";
import {
  mockRenderablePendingItineraryOne,
  mockRenderablePendingItineraryTwo,
} from "@/mockData/bifrost/mockRenderablePendingItineraries";

const meta: Meta<typeof PendingItineraryPlannerHeader> = {
  title: "BifrostForm/PendingItineraryPlanner/PendingItineraryPlannerHeader",
  component: PendingItineraryPlannerHeader,
};
export default meta;

type Story = StoryObj<typeof PendingItineraryPlannerHeader>;

const StoryWrapperOne = () => {
  const dynamicArgs: PendingItineraryPlannerHeaderProps = {
    renderablePendingItinerary: mockRenderablePendingItineraryOne,
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <PendingItineraryPlannerHeader {...dynamicArgs} />
    </div>
  );
};

export const ExampleOne: Story = {
  render: () => <StoryWrapperOne />,
  args: {},
};

const StoryWrapperTwo = () => {
  const dynamicArgs: PendingItineraryPlannerHeaderProps = {
    renderablePendingItinerary: mockRenderablePendingItineraryTwo,
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <PendingItineraryPlannerHeader {...dynamicArgs} />
    </div>
  );
};

export const ExampleTwo: Story = {
  render: () => <StoryWrapperTwo />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  PendingItineraryPlannerHeaderClosed,
  PendingItineraryPlannerHeaderClosedProps,
} from ".";
import {
  mockRenderablePendingItineraryOne,
  mockRenderablePendingItineraryTwo,
} from "@/mockData/bifrost/mockRenderablePendingItineraries";

const meta: Meta<typeof PendingItineraryPlannerHeaderClosed> = {
  title:
    "BifrostForm/PendingItineraryPlanner/PendingItineraryPlannerHeaderClosed",
  component: PendingItineraryPlannerHeaderClosed,
};
export default meta;

type Story = StoryObj<typeof PendingItineraryPlannerHeaderClosed>;

const StoryWrapperOne = () => {
  const dynamicArgs: PendingItineraryPlannerHeaderClosedProps = {
    renderablePendingItinerary: mockRenderablePendingItineraryOne,
    scrollToBifrostFormQuestion: ({
      formQuestionId,
    }: {
      formQuestionId: string;
    }) => {
      console.log(`scrollToBifrostFormQuestion: ${formQuestionId}`);
    },
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
      <PendingItineraryPlannerHeaderClosed {...dynamicArgs} />
    </div>
  );
};

export const ExampleOne: Story = {
  render: () => <StoryWrapperOne />,
  args: {},
};

const StoryWrapperTwo = () => {
  const dynamicArgs: PendingItineraryPlannerHeaderClosedProps = {
    renderablePendingItinerary: mockRenderablePendingItineraryTwo,
    scrollToBifrostFormQuestion: ({
      formQuestionId,
    }: {
      formQuestionId: string;
    }) => {
      console.log(`scrollToBifrostFormQuestion: ${formQuestionId}`);
    },
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
      <PendingItineraryPlannerHeaderClosed {...dynamicArgs} />
    </div>
  );
};

export const ExampleTwo: Story = {
  render: () => <StoryWrapperTwo />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  BifrostFormInteractionHistory,
  BifrostFormInteractionHistoryProps,
} from ".";
import {
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  mockBifrostFormQuestionWithSplitTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

const meta: Meta<typeof BifrostFormInteractionHistory> = {
  title: "BifrostFormInteractionHistory/BifrostFormInteractionHistory",
  component: BifrostFormInteractionHistory,
};
export default meta;

type Story = StoryObj<typeof BifrostFormInteractionHistory>;

const StoryWrapper = () => {
  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseTwo,
    mockBifrostFormQuestionWithEmailResponseTwo,
    mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  ]);

  const dynamicArgs: BifrostFormInteractionHistoryProps = {
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse: ({
      updatedBifrostFormQuestionWithResponse,
    }: {
      updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => {
      console.log(
        "updatedBifrostFormQuestionWithResponse",
        updatedBifrostFormQuestionWithResponse
      );
    },
    suggestCalendarDateRangesFromConstraints: async ({
      descriptionOfPotentialCalendarDates,
    }: {
      descriptionOfPotentialCalendarDates: string;
    }) => {
      console.log(
        "descriptionOfPotentialCalendarDates",
        descriptionOfPotentialCalendarDates
      );
      return [];
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
      <BifrostFormInteractionHistory {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

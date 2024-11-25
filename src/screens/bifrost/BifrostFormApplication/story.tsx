import { Meta, StoryObj } from "@storybook/react";
import React, { useMemo } from "react";
import { BifrostFormApplication } from ".";
import { BifrostFormStateProvider } from "@/providers/BifrostFormStateProvider";
import { MockBifrostFormStateProvider } from "@/providers/MockBifrostFormStateProvider";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  mockBifrostFormQuestionWithSplitTextResponseOne,
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof BifrostFormApplication> = {
  title: "Applications/BifrostFormApplication",
  component: BifrostFormApplication,
};
export default meta;

type Story = StoryObj<typeof BifrostFormApplication>;

const StoryWrapper = () => {
  const mockBifrostFormQuestionsWithResponses = useMemo(
    () => [
      mockBifrostFormQuestionWithSplitTextResponseOne,
      mockBifrostFormQuestionWithEmailResponseOne,
      mockBifrostFormQuestionWithPhoneNumberResponseOne,
    ],
    []
  );

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <BifrostFormStateProvider>
        <MockBifrostFormStateProvider
          mockActiveBifrostFormQuestionsWithResponses={
            mockBifrostFormQuestionsWithResponses
          }
        >
          <BifrostFormApplication />
        </MockBifrostFormStateProvider>
      </BifrostFormStateProvider>
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

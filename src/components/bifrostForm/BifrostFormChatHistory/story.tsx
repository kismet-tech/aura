import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostFormChatHistory, BifrostFormChatHistoryProps } from ".";
import {
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  mockBifrostFormQuestionWithSplitTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

const meta: Meta<typeof BifrostFormChatHistory> = {
  title: "bifrostFormChatHistory/BifrostFormChatHistory",
  component: BifrostFormChatHistory,
};
export default meta;

type Story = StoryObj<typeof BifrostFormChatHistory>;

const StoryWrapper = () => {
  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseTwo,
    mockBifrostFormQuestionWithEmailResponseTwo,
    mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  ]);

  const dynamicArgs: BifrostFormChatHistoryProps = {
    guestFirstName: "Julian",
    bifrostFormQuestionsWithResponses,
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
      <BifrostFormChatHistory {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

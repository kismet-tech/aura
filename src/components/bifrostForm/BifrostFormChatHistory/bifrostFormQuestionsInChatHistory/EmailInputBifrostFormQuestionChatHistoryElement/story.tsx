import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  EmailInputBifrostFormQuestionChatHistoryElement,
  EmailInputBifrostFormQuestionChatHistoryElementProps,
} from ".";
import {
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithTextResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof EmailInputBifrostFormQuestionChatHistoryElement> = {
  title:
    "bifrostFormChatHistory/EmailInputBifrostFormQuestionChatHistoryElement",
  component: EmailInputBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<typeof EmailInputBifrostFormQuestionChatHistoryElement>;

const StoryWrapper = () => {
  const dynamicArgs: EmailInputBifrostFormQuestionChatHistoryElementProps = {
    guestFirstName: "Julian",
    bifrostFormQuestionWithEmailResponse:
      mockBifrostFormQuestionWithEmailResponseTwo,
    onClick: () => {
      console.log("onClick");
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
      <EmailInputBifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

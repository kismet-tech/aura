import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  BifrostFormQuestionChatHistoryElement,
  BifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithPhoneNumberResponseTwo } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof BifrostFormQuestionChatHistoryElement> = {
  title: "bifrostFormChatHistory/BifrostFormQuestionChatHistoryElement",
  component: BifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<typeof BifrostFormQuestionChatHistoryElement>;

const StoryWrapper = () => {
  const dynamicArgs: BifrostFormQuestionChatHistoryElementProps = {
    guestFirstName: "Julian",
    bifrostFormQuestionWithResponse:
      mockBifrostFormQuestionWithPhoneNumberResponseTwo,
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
      <BifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

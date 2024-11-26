import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  PhoneInputBifrostFormQuestionChatHistoryElement,
  PhoneInputBifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithPhoneNumberResponseTwo } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof PhoneInputBifrostFormQuestionChatHistoryElement> = {
  title:
    "bifrostFormChatHistory/PhoneInputBifrostFormQuestionChatHistoryElement",
  component: PhoneInputBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<typeof PhoneInputBifrostFormQuestionChatHistoryElement>;

const StoryWrapper = () => {
  const dynamicArgs: PhoneInputBifrostFormQuestionChatHistoryElementProps = {
    guestFirstName: "Julian",
    bifrostFormQuestionWithPhoneNumberResponse:
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
      <PhoneInputBifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

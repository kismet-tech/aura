import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  TextInputBifrostFormQuestionChatHistoryElement,
  TextInputBifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithTextResponseOne } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof TextInputBifrostFormQuestionChatHistoryElement> = {
  title:
    "bifrostFormChatHistory/TextInputBifrostFormQuestionChatHistoryElement",
  component: TextInputBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<typeof TextInputBifrostFormQuestionChatHistoryElement>;

const StoryWrapper = () => {
  const dynamicArgs: TextInputBifrostFormQuestionChatHistoryElementProps = {
    guestFirstName: "Julian",
    bifrostTextInputFormQuestionWithTextResponse:
      mockBifrostFormQuestionWithTextResponseOne,
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
      <TextInputBifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

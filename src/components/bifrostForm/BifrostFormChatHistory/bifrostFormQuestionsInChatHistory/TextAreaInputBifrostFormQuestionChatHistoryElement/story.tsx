import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  TextAreaInputBifrostFormQuestionChatHistoryElement,
  TextAreaInputBifrostFormQuestionChatHistoryElementProps,
} from ".";
import {
  mockBifrostFormQuestionWithTextResponseOne,
  mockBifrostFormQuestionWithTextResponseThree,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof TextAreaInputBifrostFormQuestionChatHistoryElement> = {
  title:
    "bifrostFormChatHistory/TextAreaInputBifrostFormQuestionChatHistoryElement",
  component: TextAreaInputBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<
  typeof TextAreaInputBifrostFormQuestionChatHistoryElement
>;

const StoryWrapper = () => {
  const dynamicArgs: TextAreaInputBifrostFormQuestionChatHistoryElementProps = {
    guestFirstName: "Julian",
    bifrostTextAreaFormQuestionWithTextResponse:
      mockBifrostFormQuestionWithTextResponseThree,
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
      <TextAreaInputBifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

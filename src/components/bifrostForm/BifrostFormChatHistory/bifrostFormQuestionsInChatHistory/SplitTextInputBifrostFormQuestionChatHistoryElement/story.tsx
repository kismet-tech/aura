import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  SplitTextInputBifrostFormQuestionChatHistoryElement,
  SplitTextInputBifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithSplitTextResponseTwo } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<typeof SplitTextInputBifrostFormQuestionChatHistoryElement> = {
  title:
    "bifrostFormChatHistory/SplitTextInputBifrostFormQuestionChatHistoryElement",
  component: SplitTextInputBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<
  typeof SplitTextInputBifrostFormQuestionChatHistoryElement
>;

const StoryWrapper = () => {
  const dynamicArgs: SplitTextInputBifrostFormQuestionChatHistoryElementProps =
    {
      guestFirstName: "Julian",
      bifrostFormQuestionWithSplitTextResponse:
        mockBifrostFormQuestionWithSplitTextResponseTwo,
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
      <SplitTextInputBifrostFormQuestionChatHistoryElement {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

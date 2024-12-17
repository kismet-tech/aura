import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  ToggleButtonGroupBifrostFormQuestionChatHistoryElement,
  ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithTextResponseFive } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<
  typeof ToggleButtonGroupBifrostFormQuestionChatHistoryElement
> = {
  title:
    "bifrostFormChatHistory/ToggleButtonGroupBifrostFormQuestionChatHistoryElement",
  component: ToggleButtonGroupBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<
  typeof ToggleButtonGroupBifrostFormQuestionChatHistoryElement
>;

const StoryWrapper = () => {
  const dynamicArgs: ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps =
    {
      guestFirstName: "Julian",
      bifrostToggleButtonGroupFormQuestionWithTextResponse:
        mockBifrostFormQuestionWithTextResponseFive,
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
      <ToggleButtonGroupBifrostFormQuestionChatHistoryElement
        {...dynamicArgs}
      />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement,
  MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps,
} from ".";
import { mockBifrostFormQuestionWithMultiCalendarDateRangeResponseTwo } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<
  typeof MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement
> = {
  title:
    "bifrostFormChatHistory/MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement",
  component: MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<
  typeof MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement
>;

const StoryWrapper = () => {
  const dynamicArgs: MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps =
    {
      guestFirstName: "Julian",
      bifrostFormQuestionWithMultiCalendarDateRangeResponse:
        mockBifrostFormQuestionWithMultiCalendarDateRangeResponseTwo,
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
      <MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement
        {...dynamicArgs}
      />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

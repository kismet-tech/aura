import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  CalendarDateRangeBifrostFormQuestionChatHistoryElement,
  CalendarDateRangeBifrostFormQuestionChatHistoryElementProps,
} from ".";
import {
  mockBifrostFormQuestionWithCalendarDateRangeResponseOne,
  mockBifrostFormQuestionWithTextResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

const meta: Meta<
  typeof CalendarDateRangeBifrostFormQuestionChatHistoryElement
> = {
  title:
    "bifrostFormChatHistory/CalendarDateRangeBifrostFormQuestionChatHistoryElement",
  component: CalendarDateRangeBifrostFormQuestionChatHistoryElement,
};
export default meta;

type Story = StoryObj<
  typeof CalendarDateRangeBifrostFormQuestionChatHistoryElement
>;

const StoryWrapper = () => {
  const dynamicArgs: CalendarDateRangeBifrostFormQuestionChatHistoryElementProps =
    {
      guestFirstName: "Julian",
      bifrostFormQuestionWithCalendarDateRangeResponse:
        mockBifrostFormQuestionWithCalendarDateRangeResponseOne,
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
      <CalendarDateRangeBifrostFormQuestionChatHistoryElement
        {...dynamicArgs}
      />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

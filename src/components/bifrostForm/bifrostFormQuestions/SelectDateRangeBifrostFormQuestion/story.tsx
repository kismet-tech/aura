import { Meta, StoryObj } from "@storybook/react";
import {
  SelectDateRangeBifrostFormQuestion,
  SelectDateRangeBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableSelectDateRangeBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";
import { PendingCalendarDateRange } from "@/models/core/date/CalendarDateRange";

const meta: Meta<typeof SelectDateRangeBifrostFormQuestion> = {
  title: "BifrostFormQuestions/SelectDateRangeBifrostFormQuestion",
  component: SelectDateRangeBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof SelectDateRangeBifrostFormQuestion>;

const StoryWrapper = () => {
  const [calendarDateRange, setCalendarDateRange] =
    useState<PendingCalendarDateRange>({
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    });

  const dynamicArgs: SelectDateRangeBifrostFormQuestionProps = {
    renderableSelectDateRangeBifrostFormQuestion:
      mockRenderableSelectDateRangeBifrostFormQuestionOne,
    calendarDateRange,
    setCalendarDateRange: ({
      updatedCalendarDateRange,
    }: {
      updatedCalendarDateRange: PendingCalendarDateRange;
    }) => setCalendarDateRange(updatedCalendarDateRange),
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) =>
      console.log("isResponseValid", isResponseValid),
    setHasQuestionBeenRespondedTo: ({
      hasQuestionBeenRespondedTo,
    }: {
      hasQuestionBeenRespondedTo: boolean;
    }) => {
      console.log("hasQuestionBeenRespondedTo", hasQuestionBeenRespondedTo);
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
      <SelectDateRangeBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

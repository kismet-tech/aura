import { Meta, StoryObj } from "@storybook/react";
import {
  MultiSelectDateRangeBifrostFormQuestion,
  MultiSelectDateRangeBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableMultiSelectDateRangeBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";
import { PendingCalendarDateRange } from "@kismet_ai/foundation";

const meta: Meta<typeof MultiSelectDateRangeBifrostFormQuestion> = {
  title: "BifrostFormQuestions/MultiSelectDateRangeBifrostFormQuestion",
  component: MultiSelectDateRangeBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof MultiSelectDateRangeBifrostFormQuestion>;

const StoryWrapper = () => {
  const [calendarDateRanges, setCalendarDateRanges] = useState<
    PendingCalendarDateRange[]
  >([
    {
      startCalendarDate: undefined,
      endCalendarDate: undefined,
    },
  ]);

  const dynamicArgs: MultiSelectDateRangeBifrostFormQuestionProps = {
    renderableMultiSelectDateRangeBifrostFormQuestion:
      mockRenderableMultiSelectDateRangeBifrostFormQuestionOne,
    calendarDateRanges,
    setCalendarDateRanges: ({
      updatedCalendarDateRanges,
    }: {
      updatedCalendarDateRanges: PendingCalendarDateRange[];
    }) => {
      setCalendarDateRanges(updatedCalendarDateRanges);
    },
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) => {
      console.log("isResponseValid", isResponseValid);
    },
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
      <MultiSelectDateRangeBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

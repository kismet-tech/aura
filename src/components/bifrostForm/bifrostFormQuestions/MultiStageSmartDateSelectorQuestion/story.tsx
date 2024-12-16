import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  MultiStageSmartDateSelectorQuestion,
  MultiStageSmartDateSelectorQuestionProps,
} from ".";
import {
  BifrostFormQuestionMultiStageSmartDateResponseValue,
  CalendarDateRange,
  mockBifrostFormQuestionMultiStageSmartDateResponseEmpty,
  mockRenderableMultiStageSmartDateSelectorBifrostFormQuestion,
} from "@kismet_ai/foundation";

const meta: Meta<typeof MultiStageSmartDateSelectorQuestion> = {
  title: "BifrostFormQuestions/MultiStageSmartDateSelectorQuestion",
  component: MultiStageSmartDateSelectorQuestion,
};
export default meta;

type Story = StoryObj<typeof MultiStageSmartDateSelectorQuestion>;

const StoryWrapper = () => {
  const [value, setValue] =
    useState<BifrostFormQuestionMultiStageSmartDateResponseValue>({
      ...mockBifrostFormQuestionMultiStageSmartDateResponseEmpty.responseValue,
    });

  const dynamicArgs: MultiStageSmartDateSelectorQuestionProps = {
    renderableMultiStageSmartDateSelectorBifrostFormQuestion:
      mockRenderableMultiStageSmartDateSelectorBifrostFormQuestion,
    value,
    setValue: ({
      updatedValue,
    }: {
      updatedValue: BifrostFormQuestionMultiStageSmartDateResponseValue;
    }) => {
      setValue(updatedValue);
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
    suggestCalendarDateRangesFromConstraints: async ({}: {
      descriptionOfPotentialCalendarDates: string;
    }): Promise<CalendarDateRange[]> => {
      return [
        {
          startCalendarDate: {
            year: 2025,
            month: 2,
            day: 7,
          },
          endCalendarDate: {
            year: 2025,
            month: 2,
            day: 9,
          },
        },
        {
          startCalendarDate: {
            year: 2025,
            month: 10,
            day: 10,
          },
          endCalendarDate: {
            year: 2025,
            month: 10,
            day: 14,
          },
        },
        {
          startCalendarDate: {
            year: 2025,
            month: 11,
            day: 1,
          },
          endCalendarDate: {
            year: 2025,
            month: 11,
            day: 10,
          },
        },
      ];
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
      <MultiStageSmartDateSelectorQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  MultiStageReasonForTravelQuestion,
  MultiStageReasonForTravelQuestionProps,
} from ".";
import {
  BifrostFormQuestionMultiStageReasonForTravelResponseValue,
  mockBifrostFormQuestionMultiStageReasonForTravelResponseEmpty,
  mockRenderableMultiStageReasonForTravelBifrostFormQuestion,
} from "@kismet_ai/foundation";

const meta: Meta<typeof MultiStageReasonForTravelQuestion> = {
  title: "BifrostFormQuestions/MultiStageReasonForTravelQuestion",
  component: MultiStageReasonForTravelQuestion,
};
export default meta;

type Story = StoryObj<typeof MultiStageReasonForTravelQuestion>;

const StoryWrapper = () => {
  mockBifrostFormQuestionMultiStageReasonForTravelResponseEmpty.responseValue;

  const [value, setValue] =
    useState<BifrostFormQuestionMultiStageReasonForTravelResponseValue>({
      ...mockBifrostFormQuestionMultiStageReasonForTravelResponseEmpty.responseValue,
    });

  const dynamicArgs: MultiStageReasonForTravelQuestionProps = {
    renderableMultiStageReasonForTravelBifrostFormQuestion:
      mockRenderableMultiStageReasonForTravelBifrostFormQuestion,
    value,
    setValue: ({
      updatedValue,
    }: {
      updatedValue: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
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
      <MultiStageReasonForTravelQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import {
  SplitTextInputBifrostFormQuestion,
  SplitTextInputBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableSplitTextInputBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof SplitTextInputBifrostFormQuestion> = {
  title: "BifrostFormQuestions/SplitTextInputBifrostFormQuestion",
  component: SplitTextInputBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof SplitTextInputBifrostFormQuestion>;

const StoryWrapper = () => {
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");

  const dynamicArgs: SplitTextInputBifrostFormQuestionProps = {
    renderableSplitTextInputBifrostFormQuestion:
      mockRenderableSplitTextInputBifrostFormQuestionOne,
    leftValue,
    setLeftValue: ({ updatedValue }: { updatedValue: string }) =>
      setLeftValue(updatedValue),
    rightValue,
    setRightValue: ({ updatedValue }: { updatedValue: string }) =>
      setRightValue(updatedValue),
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) => {
      console.log("isResponseValid", isResponseValid);
    },
    setHasQuestionBeenRespondedTo: ({
      hasQuestionBeenRespondedTo,
    }: {
      hasQuestionBeenRespondedTo: boolean;
    }) => {
      console.log(
        "SplitTextInputBifrostFormQuestion hasQuestionBeenRespondedTo",
        hasQuestionBeenRespondedTo
      );
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
      <SplitTextInputBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

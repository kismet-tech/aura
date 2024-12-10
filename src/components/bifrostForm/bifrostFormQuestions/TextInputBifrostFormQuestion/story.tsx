import { Meta, StoryObj } from "@storybook/react";
import {
  TextInputBifrostFormQuestion,
  TextInputBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableTextInputBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof TextInputBifrostFormQuestion> = {
  title: "BifrostFormQuestions/TextInputBifrostFormQuestion",
  component: TextInputBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof TextInputBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState("");

  const dynamicArgs: TextInputBifrostFormQuestionProps = {
    renderableTextInputBifrostFormQuestion:
      mockRenderableTextInputBifrostFormQuestionOne,
    value,
    setValue: ({ updatedValue }: { updatedValue: string }) =>
      setValue(updatedValue),
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
      <TextInputBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

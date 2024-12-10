import { Meta, StoryObj } from "@storybook/react";
import {
  TextAreaBifrostFormQuestion,
  TextAreaBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableTextAreaBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof TextAreaBifrostFormQuestion> = {
  title: "BifrostFormQuestions/TextAreaBifrostFormQuestion",
  component: TextAreaBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof TextAreaBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState("");

  const dynamicArgs: TextAreaBifrostFormQuestionProps = {
    renderableTextAreaBifrostFormQuestion:
      mockRenderableTextAreaBifrostFormQuestionOne,
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
      <TextAreaBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

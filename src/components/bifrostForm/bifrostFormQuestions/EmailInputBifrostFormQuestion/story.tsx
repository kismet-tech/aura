import { Meta, StoryObj } from "@storybook/react";
import {
  EmailInputBifrostFormQuestion,
  EmailInputBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableEmailInputBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof EmailInputBifrostFormQuestion> = {
  title: "BifrostFormQuestions/EmailInputBifrostFormQuestion",
  component: EmailInputBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof EmailInputBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState<string>("");
  const [_isResponseValid, setisResponseValid] = useState<boolean>(true);

  const dynamicArgs: EmailInputBifrostFormQuestionProps = {
    renderableEmailInputBifrostFormQuestion:
      mockRenderableEmailInputBifrostFormQuestionOne,
    value,
    setValue: ({ updatedValue }: { updatedValue: string }) => {
      setValue(updatedValue);
    },
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) => {
      setisResponseValid(isResponseValid);
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
      <EmailInputBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

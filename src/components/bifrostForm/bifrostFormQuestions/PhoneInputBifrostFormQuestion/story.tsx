import { Meta, StoryObj } from "@storybook/react";
import {
  PhoneInputBifrostFormQuestion,
  PhoneInputBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderablePhoneInputBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof PhoneInputBifrostFormQuestion> = {
  title: "BifrostFormQuestions/PhoneInputBifrostFormQuestion",
  component: PhoneInputBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof PhoneInputBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState("");
  const [_isResponseValid, setIsResponseValid] = useState<boolean>(true);

  const dynamicArgs: PhoneInputBifrostFormQuestionProps = {
    renderablePhoneInputBifrostFormQuestion:
      mockRenderablePhoneInputBifrostFormQuestionOne,
    value,
    setValue: ({ updatedValue }: { updatedValue: string }) =>
      setValue(updatedValue),
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) => {
      setIsResponseValid(isResponseValid);
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
      <PhoneInputBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

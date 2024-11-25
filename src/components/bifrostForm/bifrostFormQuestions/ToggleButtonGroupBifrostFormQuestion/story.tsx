import { Meta, StoryObj } from "@storybook/react";
import {
  ToggleButtonGroupBifrostFormQuestion,
  ToggleButtonGroupBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableToggleButtonGroupBifrostFormQuestionTwo } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";

const meta: Meta<typeof ToggleButtonGroupBifrostFormQuestion> = {
  title: "BifrostFormQuestions/ToggleButtonGroupBifrostFormQuestion",
  component: ToggleButtonGroupBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof ToggleButtonGroupBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState<string | undefined>("");

  const dynamicArgs: ToggleButtonGroupBifrostFormQuestionProps = {
    renderableToggleButtonGroupBifrostFormQuestion:
      mockRenderableToggleButtonGroupBifrostFormQuestionTwo,
    value,
    setValue: ({ updatedValue }: { updatedValue: string | undefined }) => {
      console.log("updatedValue IN WRAPPER", updatedValue);
      setValue(updatedValue);
    },
    setIsResponseValid: ({ isResponseValid }: { isResponseValid: boolean }) => {
      console.log("isResponseValid", isResponseValid);
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
      <ToggleButtonGroupBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

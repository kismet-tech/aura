import { Meta, StoryObj } from "@storybook/react";
import {
  SelectorBifrostFormQuestion,
  SelectorBifrostFormQuestionProps,
} from ".";
import React, { useState } from "react";
import { mockRenderableSelectorBifrostFormQuestionAskingLocation } from "@kismet_ai/foundation/dist/models/bifrost/BifrostFormQuestions/BifrostFormQuestion/mockData/mockRenderableSelectorBifrostFormQuestions";

const meta: Meta<typeof SelectorBifrostFormQuestion> = {
  title: "BifrostFormQuestions/SelectorBifrostFormQuestion",
  component: SelectorBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof SelectorBifrostFormQuestion>;

const StoryWrapper = () => {
  const [value, setValue] = useState<string | undefined>("");

  const dynamicArgs: SelectorBifrostFormQuestionProps = {
    renderableSelectorBifrostFormQuestion:
      mockRenderableSelectorBifrostFormQuestionAskingLocation,
    value,
    setValue: ({ updatedValue }: { updatedValue: string | undefined }) => {
      console.log("updatedValue IN WRAPPER", updatedValue);
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
      <SelectorBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useMemo } from "react";
import { BifrostFormApplication } from ".";
import { BifrostFormStateProvider } from "@/providers/BifrostFormStateProvider";
import { MockBifrostFormStateProvider } from "@/providers/MockBifrostFormStateProvider";
import {
  mockBifrostFormQuestionWithSplitTextResponseOne,
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { MockBifrostApi } from "@/apis/bifrostApi/mockBifrostApi";
import { AppViewport } from "@/components/atoms/AppViewport";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";

const meta: Meta<typeof BifrostFormApplication> = {
  title: "Applications/BifrostFormApplication",
  component: BifrostFormApplication,
};
export default meta;

type Story = StoryObj<typeof BifrostFormApplication>;

const StoryWrapper = () => {
  const {} = useBifrostFormState();

  const mockBifrostFormQuestionsWithResponses = useMemo(
    () => [
      mockBifrostFormQuestionWithSplitTextResponseOne,
      mockBifrostFormQuestionWithEmailResponseOne,
      mockBifrostFormQuestionWithPhoneNumberResponseOne,
    ],
    []
  );

  return (
    <AppViewport>
      <BifrostFormStateProvider bifrostApi={new MockBifrostApi()}>
        <BifrostFormApplication />
      </BifrostFormStateProvider>
    </AppViewport>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

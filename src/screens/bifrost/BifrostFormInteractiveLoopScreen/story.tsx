import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  mockBifrostFormQuestionWithSplitTextResponseTwo,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  BifrostFormInteractiveLoopScreen,
  BifrostFormInteractiveLoopScreenProps,
} from ".";
import { AppViewport } from "@/components/atoms/AppViewport";
import { BifrostFormStateProvider } from "@/providers/BifrostFormStateProvider";
import { MockBifrostApi } from "@/apis/bifrostApi/mockBifrostApi";
import { MockBifrostFormStateProvider } from "@/providers/MockBifrostFormStateProvider";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";

const meta: Meta<typeof BifrostFormInteractiveLoopScreen> = {
  title: "BifrostForm/Screens/BifrostFormInteractiveLoopScreen",
  component: BifrostFormInteractiveLoopScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostFormInteractiveLoopScreen>;

const StoryWrapper = () => {
  const {
    activeBifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse,
    historicalBifrostFormQuestionsWithResponses,
    renderablePendingItinerary,
    submitBifrostFormQuestion,
  } = useBifrostFormState();

  const dynamicArgs: BifrostFormInteractiveLoopScreenProps = {
    activeBifrostFormQuestionsWithResponses,
    historicalBifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse,
    renderablePendingItinerary,
    submitBifrostFormQuestion,
  };

  return <BifrostFormInteractiveLoopScreen {...dynamicArgs} />;
};

export const Example: Story = {
  render: () => {
    const historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [
        mockBifrostFormQuestionWithSplitTextResponseTwo,
        mockBifrostFormQuestionWithEmailResponseTwo,
        mockBifrostFormQuestionWithPhoneNumberResponseTwo,
      ];

    const activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [mockBifrostFormQuestionWithTextResponseTwo];

    return (
      <AppViewport>
        <BifrostFormStateProvider bifrostApi={new MockBifrostApi()}>
          <MockBifrostFormStateProvider
            mockBifrostFormQuestionsWithResponses={[
              ...historicalBifrostFormQuestionsWithResponses,
              ...activeBifrostFormQuestionsWithResponses,
            ]}
            mockActiveBifrostFormQuestionsWithResponses={
              activeBifrostFormQuestionsWithResponses
            }
            createUserSession={true}
          >
            <StoryWrapper />
          </MockBifrostFormStateProvider>
        </BifrostFormStateProvider>
      </AppViewport>
    );
  },
  args: {},
};

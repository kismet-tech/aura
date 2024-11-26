import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  mockBifrostFormQuestionWithEmailResponseTwo,
  mockBifrostFormQuestionWithPhoneNumberResponseTwo,
  mockBifrostFormQuestionWithSplitTextResponseTwo,
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  BifrostFormQuestionLoopScreen,
  BifrostFormQuestionLoopScreenProps,
} from ".";
import { mockRenderablePendingItineraryTwo } from "@/mockData/bifrost/mockRenderablePendingItineraries";
import { AppViewport } from "@/components/atoms/AppViewport";

const meta: Meta<typeof BifrostFormQuestionLoopScreen> = {
  title: "BifrostForm/Screens/BifrostFormQuestionLoopScreen",
  component: BifrostFormQuestionLoopScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostFormQuestionLoopScreen>;

const StoryWrapper = () => {
  const [
    activeBifrostFormQuestionsWithResponses,
    setActiveBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithTextResponseTwo,
    mockBifrostFormQuestionWithTextResponseFour,
  ]);

  const historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
    [
      mockBifrostFormQuestionWithSplitTextResponseTwo,
      mockBifrostFormQuestionWithEmailResponseTwo,
      mockBifrostFormQuestionWithPhoneNumberResponseTwo,
    ];

  const dynamicArgs: BifrostFormQuestionLoopScreenProps = {
    activeBifrostFormQuestionsWithResponses,
    historicalBifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse: ({
      updatedBifrostFormQuestionWithResponse,
    }: {
      updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => {
      setActiveBifrostFormQuestionsWithResponses(
        (
          previousBifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[]
        ) => {
          return previousBifrostFormQuestionWithResponses.map(
            (
              previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
            ) => {
              if (
                updatedBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId ===
                previousBifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
              ) {
                return updatedBifrostFormQuestionWithResponse;
              }
              return previousBifrostFormQuestionWithResponse;
            }
          );
        }
      );
    },
    renderablePendingItinerary: mockRenderablePendingItineraryTwo,
  };

  return (
    <AppViewport>
      <BifrostFormQuestionLoopScreen {...dynamicArgs} />
    </AppViewport>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

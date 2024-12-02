import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BifrostFormLaunchScreen, BifrostFormLaunchScreenProps } from ".";
import {
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
  mockBifrostFormQuestionWithSplitTextResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";

const meta: Meta<typeof BifrostFormLaunchScreen> = {
  title: "BifrostForm/Screens/BifrostFormLaunchScreen",
  component: BifrostFormLaunchScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostFormLaunchScreen>;

const StoryWrapper = () => {
  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseOne,
    mockBifrostFormQuestionWithEmailResponseOne,
    mockBifrostFormQuestionWithPhoneNumberResponseOne,
  ]);

  const dynamicArgs: BifrostFormLaunchScreenProps = {
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse: ({
      updatedBifrostFormQuestionWithResponse,
    }: {
      updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => {
      setBifrostFormQuestionsWithResponses(
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
    handleProgressForward: () => {
      console.log("Progressing forward");
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
      <BifrostFormLaunchScreen {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

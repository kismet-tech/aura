import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  mockBifrostFormQuestionWithTextResponseThree,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  BifrostFormQuestionLoopScreen,
  BifrostFormQuestionLoopScreenProps,
} from ".";

const meta: Meta<typeof BifrostFormQuestionLoopScreen> = {
  title: "BifrostForm/Screens/BifrostFormQuestionLoopScreen",
  component: BifrostFormQuestionLoopScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostFormQuestionLoopScreen>;

const StoryWrapper = () => {
  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithTextResponseTwo,
    mockBifrostFormQuestionWithTextResponseThree,
  ]);

  const dynamicArgs: BifrostFormQuestionLoopScreenProps = {
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
      <BifrostFormQuestionLoopScreen {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

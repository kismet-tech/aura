import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ActiveBifrostFormQuestions, ActiveBifrostFormQuestionsProps } from ".";
import {
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
  mockBifrostFormQuestionWithSplitTextResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";

const meta: Meta<typeof ActiveBifrostFormQuestions> = {
  title: "BifrostForm/ActiveBifrostFormQuestions",
  component: ActiveBifrostFormQuestions,
};
export default meta;

type Story = StoryObj<typeof ActiveBifrostFormQuestions>;

const StoryWrapper = () => {
  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseOne,
    mockBifrostFormQuestionWithEmailResponseOne,
    mockBifrostFormQuestionWithPhoneNumberResponseOne,
  ]);

  const dynamicArgs: ActiveBifrostFormQuestionsProps = {
    activeBifrostFormQuestionsWithResponses: bifrostFormQuestionsWithResponses,
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
    setAreAllResponsesValid: ({ areAllResponsesValid }) => {
      console.log("areAllResponsesValid", areAllResponsesValid);
    },
    setBifrostFormQuestionIdsRespondedTo: function ({
      bifrostFormQuestionIdsRespondedTo,
    }: {
      bifrostFormQuestionIdsRespondedTo: string[];
    }): void {
      console.log(
        "bifrostFormQuestionIdsRespondedTo",
        bifrostFormQuestionIdsRespondedTo
      );
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
      <ActiveBifrostFormQuestions {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ActiveBifrostFormQuestions, ActiveBifrostFormQuestionsProps } from ".";
import {
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
  mockBifrostFormQuestionWithSplitTextResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import {
  BifrostFormQuestionWithResponse,
  mockHotelBifrostFormMetadata,
} from "@kismet_ai/foundation";

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
    bifrostFormMetadata: mockHotelBifrostFormMetadata,
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
    setBifrostFormQuestionIdsWithValidResponses: ({
      bifrostFormQuestionIdsWithValidResponses,
    }) => {
      console.log(
        "bifrostFormQuestionIdsWithValidResponses",
        bifrostFormQuestionIdsWithValidResponses
      );
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
    suggestCalendarDateRangesFromConstraints: async ({
      descriptionOfPotentialCalendarDates,
    }: {
      descriptionOfPotentialCalendarDates: string;
    }) => {
      return [];
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

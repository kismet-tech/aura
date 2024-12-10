import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from ".";
import { mockBifrostFormQuestionWithTextResponseOne } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";

const meta: Meta<typeof RenderedBifrostFormQuestion> = {
  title: "BifrostForm/RenderedBifrostFormQuestion",
  component: RenderedBifrostFormQuestion,
};
export default meta;

type Story = StoryObj<typeof RenderedBifrostFormQuestion>;

const StoryWrapper = () => {
  const [bifrostFormQuestionWithResponse, setBifrostFormQuestionWithResponse] =
    useState<BifrostFormQuestionWithResponse>(
      mockBifrostFormQuestionWithTextResponseOne
    );

  const dynamicArgs: RenderedBifrostFormQuestionProps = {
    bifrostFormQuestionWithResponse,
    setBifrostFormQuestionResponse: ({
      updatedBifrostFormQuestionResponse,
    }: {
      updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => {
      setBifrostFormQuestionWithResponse(
        (
          previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
        ) => {
          return updateBifrostFormQuestionWithResponse({
            previousBifrostFormQuestionWithResponse,
            updatedBifrostFormQuestionResponse:
              updatedBifrostFormQuestionResponse,
          });
        }
      );
    },
    setIsResponseValid: ({ isResponseValid }) => {
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
      <RenderedBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

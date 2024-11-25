import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from ".";
import { mockBifrostFormQuestionWithTextResponseOne } from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
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
      bifrostFormQuestionResponse,
    }: {
      bifrostFormQuestionResponse: BifrostFormQuestionResponse;
    }) => {
      setBifrostFormQuestionWithResponse(
        (
          previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
        ) => {
          return updateBifrostFormQuestionWithResponse({
            previousBifrostFormQuestionWithResponse,
            bifrostFormQuestionResponse,
          });
        }
      );
    },
    setIsResponseValid: ({ isResponseValid }) => {
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
      <RenderedBifrostFormQuestion {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import {
  BifrostItineraryOfferPresentationScreen,
  BifrostItineraryOfferPresentationScreenProps,
} from ".";

const meta: Meta<typeof BifrostItineraryOfferPresentationScreen> = {
  title: "BifrostForm/Screens/BifrostItineraryOfferPresentationScreen",
  component: BifrostItineraryOfferPresentationScreen,
};
export default meta;

type Story = StoryObj<typeof BifrostItineraryOfferPresentationScreen>;

const StoryWrapper = () => {
  const dynamicArgs: BifrostItineraryOfferPresentationScreenProps = {};

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <BifrostItineraryOfferPresentationScreen {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};

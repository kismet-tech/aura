import { Meta, StoryObj } from "@storybook/react";

import React from "react";
import {
  ItineraryOfferTermsAndConditionsPresentation,
  ItineraryOfferTermsAndConditionsPresentationProps,
} from ".";

const meta: Meta<typeof ItineraryOfferTermsAndConditionsPresentation> = {
  title: "ItineraryOffer/ItineraryOfferTermsAndConditionsPresentation",
  component: ItineraryOfferTermsAndConditionsPresentation,
};
export default meta;

type Story = StoryObj<typeof ItineraryOfferTermsAndConditionsPresentation>;

const exampleOneArguments: ItineraryOfferTermsAndConditionsPresentationProps = {
  conditionText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          border: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <ItineraryOfferTermsAndConditionsPresentation {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

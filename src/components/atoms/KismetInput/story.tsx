import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { KismetInput, KismetInputProps } from ".";

const meta: Meta<typeof KismetInput> = {
  title: "Atoms/KismetInput",
  component: KismetInput,
};
export default meta;

type Story = StoryObj<typeof KismetInput>;

const exampleOneArguments: KismetInputProps = {
  children: "Itinerary Offer 1",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <KismetInput />
      </div>
    );
  },
  args: exampleOneArguments,
};

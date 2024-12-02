import { Meta, StoryObj } from "@storybook/react";
import { MadeWithKismetLogo } from ".";
import React from "react";

const meta: Meta<typeof MadeWithKismetLogo> = {
  title: "Atoms/Icons/MadeWithKismetLogo",
  component: MadeWithKismetLogo,
};
export default meta;

type Story = StoryObj<typeof MadeWithKismetLogo>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <MadeWithKismetLogo />
      </div>
    );
  },
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import { RotatingKismetLogo } from ".";
import React from "react";

const meta: Meta<typeof RotatingKismetLogo> = {
  title: "Atoms/Icons/RotatingKismetLogo",
  component: RotatingKismetLogo,
};
export default meta;

type Story = StoryObj<typeof RotatingKismetLogo>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <RotatingKismetLogo />
      </div>
    );
  },
  args: {},
};

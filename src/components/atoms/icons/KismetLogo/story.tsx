import { Meta, StoryObj } from "@storybook/react";
import { KismetLogo } from ".";
import React from "react";

const meta: Meta<typeof KismetLogo> = {
  title: "Atoms/Icons/KismetLogo",
  component: KismetLogo,
};
export default meta;

type Story = StoryObj<typeof KismetLogo>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <KismetLogo />
      </div>
    );
  },
  args: {},
};

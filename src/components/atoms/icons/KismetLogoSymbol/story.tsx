import { Meta, StoryObj } from "@storybook/react";
import { KismetLogoSymbol } from ".";
import React from "react";

const meta: Meta<typeof KismetLogoSymbol> = {
  title: "Atoms/Icons/KismetLogoSymbol",
  component: KismetLogoSymbol,
};
export default meta;

type Story = StoryObj<typeof KismetLogoSymbol>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <KismetLogoSymbol />
      </div>
    );
  },
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import { KismetShoppingCartIcon } from ".";
import React from "react";

const meta: Meta<typeof KismetShoppingCartIcon> = {
  title: "Atoms/Icons/KismetShoppingCartIcon",
  component: KismetShoppingCartIcon,
};
export default meta;

type Story = StoryObj<typeof KismetShoppingCartIcon>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <KismetShoppingCartIcon />
      </div>
    );
  },
  args: {},
};

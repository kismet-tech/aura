import { Meta, StoryObj } from "@storybook/react";
import { MonopolyHouse } from ".";
import React from "react";

const meta: Meta<typeof MonopolyHouse> = {
  title: "Atoms/Icons/MonopolyHouse",
  component: MonopolyHouse,
};
export default meta;

type Story = StoryObj<typeof MonopolyHouse>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <MonopolyHouse />
      </div>
    );
  },
  args: {},
};

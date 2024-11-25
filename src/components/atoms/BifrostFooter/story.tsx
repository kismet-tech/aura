import { Meta, StoryObj } from "@storybook/react";
import { BifrostFooter } from ".";
import React from "react";

const meta: Meta<typeof BifrostFooter> = {
  title: "Atoms/BifrostFooter",
  component: BifrostFooter,
};
export default meta;

type Story = StoryObj<typeof BifrostFooter>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <BifrostFooter />
      </div>
    );
  },
  args: {},
};

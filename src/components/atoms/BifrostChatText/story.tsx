import { Meta, StoryObj } from "@storybook/react";
import { BifrostChatText } from ".";
import React from "react";

const meta: Meta<typeof BifrostChatText> = {
  title: "Atoms/BifrostChatText",
  component: BifrostChatText,
};
export default meta;

type Story = StoryObj<typeof BifrostChatText>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <BifrostChatText>Some chat message text</BifrostChatText>
      </div>
    );
  },
  args: {},
};

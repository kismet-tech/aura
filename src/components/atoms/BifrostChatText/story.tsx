import { Meta, StoryObj } from "@storybook/react";
import { BifrostChatText } from ".";
import React from "react";
import { AppViewport } from "../AppViewport";

const meta: Meta<typeof BifrostChatText> = {
  title: "Atoms/BifrostChatText",
  component: BifrostChatText,
};
export default meta;

type Story = StoryObj<typeof BifrostChatText>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <AppViewport>
        <BifrostChatText>Some chat message text</BifrostChatText>
      </AppViewport>
    );
  },
  args: {},
};

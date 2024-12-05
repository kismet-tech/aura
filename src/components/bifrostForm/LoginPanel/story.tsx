import { Meta, StoryObj } from "@storybook/react";
import { LoginPanel } from ".";
import React from "react";
import { AppViewport } from "@/components/atoms/AppViewport";

const meta: Meta<typeof LoginPanel> = {
  title: "BifrostForm/LoginPanel",
  component: LoginPanel,
};
export default meta;

type Story = StoryObj<typeof LoginPanel>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <AppViewport>
        <LoginPanel />
      </AppViewport>
    );
  },
  args: {},
};

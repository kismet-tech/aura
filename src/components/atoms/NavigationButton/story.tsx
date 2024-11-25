import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { NavigationButton, NavigationButtonProps } from ".";

const meta: Meta<typeof NavigationButton> = {
  title: "Atoms/NavigationButton",
  component: NavigationButton,
};
export default meta;

type Story = StoryObj<typeof NavigationButton>;

const exampleOneArguments: NavigationButtonProps = {
  children: "Start Planning",
  onClick: () => {
    console.log("Clicked navigation");
  },
  isEnabled: true,
};

export const IsEnabled_Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <NavigationButton {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

const exampleTwoArguments: NavigationButtonProps = {
  children: "Start Planning",
  onClick: () => {
    console.log("Clicked navigation");
  },
  isEnabled: false,
};

export const IsDisabled_Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <NavigationButton {...args} />
      </div>
    );
  },
  args: exampleTwoArguments,
};

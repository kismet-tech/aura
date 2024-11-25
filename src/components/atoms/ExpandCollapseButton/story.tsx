import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { ExpandCollapseButton, ExpandCollapseButtonProps } from ".";

const meta: Meta<typeof ExpandCollapseButton> = {
  title: "Atoms/ExpandCollapseButton",
  component: ExpandCollapseButton,
};
export default meta;

type Story = StoryObj<typeof ExpandCollapseButton>;

const exampleOneArguments: ExpandCollapseButtonProps = {
  isCollapsed: false,
  onExpand: () => {
    console.log("Expanded");
  },
  onCollapse: () => {
    console.log("Collapsed");
  },
};

export const IsCollapsed_Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ExpandCollapseButton {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

const exampleTwoArguments: ExpandCollapseButtonProps = {
  isCollapsed: true,
  onExpand: () => {
    console.log("Expanded");
  },
  onCollapse: () => {
    console.log("Collapsed");
  },
};

export const IsExpanded_Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <ExpandCollapseButton {...args} />
      </div>
    );
  },
  args: exampleTwoArguments,
};

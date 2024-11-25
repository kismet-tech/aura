import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { KismetSectionHeader, KismetSectionHeaderProps } from ".";

const meta: Meta<typeof KismetSectionHeader> = {
  title: "Atoms/KismetSectionHeader",
  component: KismetSectionHeader,
};
export default meta;

type Story = StoryObj<typeof KismetSectionHeader>;

const exampleOneArguments: KismetSectionHeaderProps = {
  children: "Some Section Header Text",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <KismetSectionHeader {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

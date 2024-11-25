import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { KismetHeader, KismetHeaderProps } from ".";

const meta: Meta<typeof KismetHeader> = {
  title: "Atoms/KismetHeader",
  component: KismetHeader,
};
export default meta;

type Story = StoryObj<typeof KismetHeader>;

const exampleOneArguments: KismetHeaderProps = {
  children: "Itinerary Offer 1",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <KismetHeader {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

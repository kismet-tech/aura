import { Meta, StoryObj } from "@storybook/react";
import { OrnateConciergeBell } from ".";
import React from "react";

const meta: Meta<typeof OrnateConciergeBell> = {
  title: "Atoms/Icons/OrnateConciergeBell",
  component: OrnateConciergeBell,
};
export default meta;

type Story = StoryObj<typeof OrnateConciergeBell>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <OrnateConciergeBell />
      </div>
    );
  },
  args: {},
};

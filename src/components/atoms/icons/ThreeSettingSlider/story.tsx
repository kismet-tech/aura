import { Meta, StoryObj } from "@storybook/react";
import { ThreeSettingSlider } from ".";
import React from "react";

const meta: Meta<typeof ThreeSettingSlider> = {
  title: "Atoms/Icons/ThreeSettingSlider",
  component: ThreeSettingSlider,
};
export default meta;

type Story = StoryObj<typeof ThreeSettingSlider>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <ThreeSettingSlider />
      </div>
    );
  },
  args: {},
};

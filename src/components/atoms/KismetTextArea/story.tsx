import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { KismetTextArea, KismetTextAreaProps } from ".";

const meta: Meta<typeof KismetTextArea> = {
  title: "Atoms/KismetTextArea",
  component: KismetTextArea,
};
export default meta;

type Story = StoryObj<typeof KismetTextArea>;

const exampleOneArguments: KismetTextAreaProps = {
  value: "input",
  setValue: () => {},
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <KismetTextArea {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

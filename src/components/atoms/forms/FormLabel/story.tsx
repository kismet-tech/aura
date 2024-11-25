import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormLabel, FormLabelProps } from ".";

const meta: Meta<typeof FormLabel> = {
  title: "Atoms/Forms/FormLabel",
  component: FormLabel,
};
export default meta;

type Story = StoryObj<typeof FormLabel>;

const FormLabelPropsMockDataOne: FormLabelProps = {
  children: "Some text",
};

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <FormLabel {...args} />
      </div>
    );
  },
  args: FormLabelPropsMockDataOne,
};

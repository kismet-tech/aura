import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormField, FormFieldProps } from ".";

const meta: Meta<typeof FormField> = {
  title: "Atoms/Forms/FormField",
  component: FormField,
};
export default meta;

type Story = StoryObj<typeof FormField>;

const FormFieldPropsMockDataOne: FormFieldProps = {
  children: "Some text",
};

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <FormField {...args} />
      </div>
    );
  },
  args: FormFieldPropsMockDataOne,
};

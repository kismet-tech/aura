import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ValidationError, ValidationErrorProps } from ".";

const meta: Meta<typeof ValidationError> = {
  title: "Atoms/Forms/ValidationError",
  component: ValidationError,
};
export default meta;

type Story = StoryObj<typeof ValidationError>;

const ValidationErrorPropsMockDataOne: ValidationErrorProps = {
  children: "Some text",
};

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <ValidationError {...args} />
      </div>
    );
  },
  args: ValidationErrorPropsMockDataOne,
};

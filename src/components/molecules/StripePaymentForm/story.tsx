import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { StripePaymentForm, StripePaymentFormProps } from ".";
import { mockCreatePaymentIntent } from "./mockCreatePaymentIntent";

const meta: Meta<typeof StripePaymentForm> = {
  title: "Molecules/StripePaymentForm",
  component: StripePaymentForm,
};
export default meta;

type Story = StoryObj<typeof StripePaymentForm>;

const exampleOneArguments: StripePaymentFormProps = {
  paymentSuccessChildren: <div>Payment successful!</div>,
  getStripePaymentIntent: async ({}: {}) => {
    const { clientSecret } = await mockCreatePaymentIntent({});
    return { clientSecret };
  },
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <StripePaymentForm {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

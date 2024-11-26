import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { UserBadge } from ".";

const meta: Meta<typeof UserBadge> = {
  title: "BifrostFormChatHistory/UserBadge",
  component: UserBadge,
};
export default meta;

type Story = StoryObj<typeof UserBadge>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <UserBadge name={"Kismet"} />
      </div>
    );
  },
  args: {},
};

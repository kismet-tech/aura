import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { UserAvatar, UserAvatarProps } from ".";

const meta: Meta<typeof UserAvatar> = {
  title: "Atoms/UserAvatar",
  component: UserAvatar,
};
export default meta;

type Story = StoryObj<typeof UserAvatar>;

const exampleOneArguments: UserAvatarProps = {
  name: "Julian",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <UserAvatar {...args} />
      </div>
    );
  },
  args: exampleOneArguments,
};

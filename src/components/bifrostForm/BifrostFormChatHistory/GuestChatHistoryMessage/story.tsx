import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GuestChatHistoryMessage } from ".";

const meta: Meta<typeof GuestChatHistoryMessage> = {
  title: "BifrostFormChatHistory/GuestChatHistoryMessage",
  component: GuestChatHistoryMessage,
};
export default meta;

type Story = StoryObj<typeof GuestChatHistoryMessage>;

export const Example_One: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          border: "1px solid #ccc",
          padding: "16px",
        }}
      >
        <GuestChatHistoryMessage guestName="Julian">
          This is a message from Julian
        </GuestChatHistoryMessage>
      </div>
    );
  },
  args: {},
};

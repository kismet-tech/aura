import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { KismetChatHistoryMessage } from ".";

const meta: Meta<typeof KismetChatHistoryMessage> = {
  title: "BifrostFormChatHistory/KismetChatHistoryMessage",
  component: KismetChatHistoryMessage,
};
export default meta;

type Story = StoryObj<typeof KismetChatHistoryMessage>;

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
        <KismetChatHistoryMessage>
          This is a message from Kismet
        </KismetChatHistoryMessage>
      </div>
    );
  },
  args: {},
};

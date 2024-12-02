import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { AppViewportScrollArea, AppViewportScrollAreaProps } from ".";
import { AppViewport } from "../AppViewport";

const meta: Meta<typeof AppViewportScrollArea> = {
  title: "Atoms/AppViewportScrollArea",
  component: AppViewportScrollArea,
};
export default meta;

type Story = StoryObj<typeof AppViewportScrollArea>;

const exampleOneArguments: AppViewportScrollAreaProps = {
  children: "Itinerary Offer 1",
};

export const Example: Story = {
  render: (args) => {
    return (
      <AppViewport>
        <AppViewportScrollArea>
          {Array.from({ length: 100 }, (_, i) => i + 1).map(() => {
            return <h2>Some text</h2>;
          })}
        </AppViewportScrollArea>
      </AppViewport>
    );
  },
  args: exampleOneArguments,
};

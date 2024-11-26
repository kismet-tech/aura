import React from "react";

import { Meta, StoryObj } from "@storybook/react";
import { AppViewport, AppViewportProps } from ".";

const meta: Meta<typeof AppViewport> = {
  title: "Atoms/AppViewport",
  component: AppViewport,
};
export default meta;

type Story = StoryObj<typeof AppViewport>;

const exampleOneArguments: AppViewportProps = {
  children: "Itinerary Offer 1",
};

export const Example: Story = {
  render: (args) => {
    return (
      <div>
        <AppViewport>
          <div className="w-full h-full bg-blue-500 text-white text-lg">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(() => {
              return <h2>Some text</h2>;
            })}
          </div>
        </AppViewport>
      </div>
    );
  },
  args: exampleOneArguments,
};

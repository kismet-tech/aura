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

const LongContent = () => (
  <>
    <div className="bg-white p-4 mb-4">Header Content</div>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="bg-white p-4 mb-4">
        Content Block {i + 1}
      </div>
    ))}
  </>
);

export const WithOverflow: Story = {
  render: () => (
    <AppViewport>
      <LongContent />
    </AppViewport>
  ),
};

export const WithShortContent: Story = {
  render: () => (
    <AppViewport>
      <div className="bg-white p-4">Short Content</div>
    </AppViewport>
  ),
};

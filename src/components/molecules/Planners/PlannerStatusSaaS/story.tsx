import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PlannerStatus } from "./index";

const meta: Meta<typeof PlannerStatus> = {
  title: "Molecules/Planners/PlannerStatus",
  component: PlannerStatus,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlannerStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInitialStatus: Story = {
  args: {
    initialStatus: "DEFINITIVE",
  },
};

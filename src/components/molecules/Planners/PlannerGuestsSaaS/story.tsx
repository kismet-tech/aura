import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlannerGuests } from './index';

const meta = {
  title: 'Molecules/Planners/PlannerGuests',
  component: PlannerGuests,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlannerGuests>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithInitialGuests: Story = {
  args: {
    initialGuestCount: 100,
  },
};

export const WithCustomLimits: Story = {
  args: {
    initialGuestCount: 50,
    minGuests: 10,
    maxGuests: 500,
  },
}; 
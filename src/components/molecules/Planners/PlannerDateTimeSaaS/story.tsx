import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlannerDateTime } from '.';
import { addDays, addHours } from 'date-fns';

const meta = {
  title: 'Molecules/Planners/PlannerDateTimeSaaS',
  component: PlannerDateTime,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlannerDateTime>;

export default meta;
type Story = StoryObj<typeof PlannerDateTime>;

const PlannerDateTimeWrapper = () => (
  <div style={{ width: '400px', margin: '0 auto' }}>
    <PlannerDateTime />
  </div>
);

export const Default: Story = {
  render: () => <PlannerDateTimeWrapper />
};

export const WithInitialDates: Story = {
  render: () => {
    const startDate = addDays(new Date(), 7); // A week from now
    const endDate = addHours(startDate, 5); // 5 hours duration

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <PlannerDateTime
          initialStartDate={startDate}
          initialEndDate={endDate}
          onChange={(dates) => {
            console.log('Dates changed:', dates);
          }}
        />
      </div>
    );
  }
};

export const WithSetupAndTeardown: Story = {
  render: () => {
    const startDate = addDays(new Date(), 1); // Tomorrow
    const endDate = addHours(startDate, 4); // 4 hours duration

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <PlannerDateTime
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialSetupMinutes={60} // 1 hour setup
          initialTeardownMinutes={30} // 30 minutes teardown
          onChange={(dates) => {
            console.log('Dates changed:', {
              setupStart: dates.setupStartDate,
              eventStart: dates.startDate,
              eventEnd: dates.endDate,
              teardownEnd: dates.teardownEndDate
            });
          }}
        />
      </div>
    );
  }
};

export const WithDateConstraints: Story = {
  render: () => {
    const minDate = addDays(new Date(), 1); // Tomorrow
    const maxDate = addDays(new Date(), 30); // 30 days from now

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <PlannerDateTime
          minDate={minDate}
          maxDate={maxDate}
          onChange={(dates) => {
            console.log('Dates changed:', dates);
          }}
        />
      </div>
    );
  }
}; 
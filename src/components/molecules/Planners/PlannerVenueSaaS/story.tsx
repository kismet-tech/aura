import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlannerVenue } from '.';

const meta: Meta<typeof PlannerVenue> = {
  title: 'Molecules/Planners/PlannerVenueSaaS',
  component: PlannerVenue,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlannerVenue>;

export default meta;
type Story = StoryObj<typeof PlannerVenue>;

const PlannerVenueWrapper = () => (
  <div style={{ width: '400px', margin: '0 auto' }}>
    <PlannerVenue />
  </div>
);

export const Default: Story = {
  render: () => <PlannerVenueWrapper />
};

export const VenueUnavailableDueToGuestCount: Story = {
  render: () => {
    const [guestCount, setGuestCount] = React.useState(50);
    const [selectedVenues, setSelectedVenues] = React.useState(['2']); // Great Hall pre-selected

    const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCount = parseInt(e.target.value);
      setGuestCount(newCount);
    };

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <div className="mb-4 space-y-2">
          <label className="block text-sm font-medium">
            Guest Count
          </label>
          <input
            type="number"
            value={guestCount}
            onChange={handleGuestCountChange}
            min={0}
            className="w-full px-3 py-2 border rounded-md"
          />
          {guestCount > 100 && (
            <p className="text-sm text-amber-600">
              Note: Great Hall has a maximum capacity of 100 guests
            </p>
          )}
        </div>

        <PlannerVenue
          initialVenues={selectedVenues}
          guestCount={guestCount}
        />
      </div>
    );
  }
}; 
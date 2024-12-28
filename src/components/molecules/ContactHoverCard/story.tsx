import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ContactHoverCard } from './index';
import { ContactDataSource } from '../../atoms/ContactData';

const meta: Meta<typeof ContactHoverCard> = {
  title: 'Molecules/ContactHoverCard',
  component: ContactHoverCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContactHoverCard>;

const defaultData = {
  firstName: 'John',
  lastName: 'Doe',
  imageUrl: 'https://i.pravatar.cc/300?u=john_doe',
  dataSources: [
    { type: 'LinkedIn' as const, url: 'https://linkedin.com/in/johndoe' },
    { type: 'WhatsApp' as const, url: 'https://wa.me/1234567890' }
  ] as ContactDataSource[],
  bio: 'Director of Events at Luxury Hotels Inc.',
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, San Francisco, CA 94105'
  },
  sessions: [
    {
      title: 'Annual Tech Conference',
      date: '2024-06-15',
      roomCount: 2,
      events: ['Keynote', 'Networking Lunch'],
      revenue: '$5,000'
    },
    {
      title: 'Team Offsite',
      date: '2024-07-20',
      roomCount: 1,
      events: ['Workshop', 'Team Dinner'],
      revenue: '$3,000'
    }
  ]
};

const emailOnlyData = {
  firstName: 'Sarah',
  lastName: 'Smith',
  imageUrl: 'https://i.pravatar.cc/300?u=sarah_smith',
  dataSources: [
    { type: 'LinkedIn' as const, url: 'https://linkedin.com/in/sarahsmith' }
  ] as ContactDataSource[],
  bio: 'Event Coordinator at Tech Startups Ltd.',
  contactInfo: {
    email: 'sarah.smith@example.com'
  },
  sessions: [
    {
      title: 'Startup Launch Party',
      date: '2024-05-10',
      roomCount: 1,
      events: ['Product Launch', 'Networking'],
      revenue: '$2,500'
    }
  ]
};

const noBioData = {
  firstName: 'Alex',
  lastName: 'Johnson',
  imageUrl: 'https://i.pravatar.cc/300?u=alex_johnson',
  dataSources: [
    { type: 'LinkedIn' as const, url: 'https://linkedin.com/in/alexjohnson' }
  ] as ContactDataSource[],
  bio: '',
  contactInfo: {
    phone: '+1 (555) 987-6543',
    email: 'alex.johnson@example.com'
  },
  sessions: [
    {
      title: 'Company Retreat',
      date: '2024-08-01',
      roomCount: 3,
      events: ['Team Building', 'Strategy Session'],
      revenue: '$7,500'
    }
  ]
};

export const Default: Story = {
  args: defaultData
};

export const EmailOnly: Story = {
  args: emailOnlyData
};

export const NoBio: Story = {
  args: noBioData
}; 
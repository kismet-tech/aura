import type { Meta, StoryObj } from '@storybook/react';
import { ContactHoverCard } from '.';
import { ContactDataSource } from '../../atoms/ContactData';

const meta: Meta<typeof ContactHoverCard> = {
  title: 'Molecules/ContactHoverCard',
  component: ContactHoverCard,
  tags: ['autodocs'],
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
    { type: 'WhatsApp' as const, url: 'https://wa.me/1234567890' },
  ] as ContactDataSource[],
  bio: 'Frequent business traveler, prefers room service, allergic to nuts.',
  sessions: [
    {
      title: 'Business Conference',
      date: '2024-03-15',
      roomCount: 1,
      events: ['Keynote Speech', 'Networking Dinner'],
      revenue: '$1,500',
      sessionId: 'conf-2024',
      sessionDateId: 'date-2024-03-15',
      eventIds: ['event-1', 'event-2'],
    },
    {
      title: 'Summer Vacation',
      date: '2024-07-01',
      roomCount: 2,
      events: ['Pool Party'],
      revenue: '$2,500',
      sessionId: 'vacation-2024',
      sessionDateId: 'date-2024-07-01',
      eventIds: ['event-3'],
    },
  ],
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, San Francisco, CA 94105',
  },
};

export const Default: Story = {
  args: {
    ...defaultData,
    onBioEdit: (updatedBio) => {
      console.log('Updated bio:', updatedBio);
      alert('Bio updated!');
    },
    onSessionClick: (sessionId) => console.log('Session clicked:', sessionId),
    onDateClick: (dateId) => console.log('Date clicked:', dateId),
    onEventClick: (eventId) => console.log('Event clicked:', eventId),
    onContactInfoEdit: (updatedInfo) => {
      console.log('Updated contact info:', updatedInfo);
      alert('Contact info updated!');
    },
  },
};

export const NoImage: Story = {
  args: {
    ...defaultData,
    imageUrl: undefined,
  },
};

export const NoDataSources: Story = {
  args: {
    ...defaultData,
    dataSources: [],
  },
};

export const WithBioOnly: Story = {
  args: {
    ...defaultData,
    dataSources: [],
    sessions: [],
    contactInfo: undefined,
  },
};

export const WithSessionsOnly: Story = {
  args: {
    ...defaultData,
    bio: undefined,
    contactInfo: undefined,
  },
};

export const WithContactInfoOnly: Story = {
  args: {
    ...defaultData,
    bio: undefined,
    sessions: [],
  },
}; 
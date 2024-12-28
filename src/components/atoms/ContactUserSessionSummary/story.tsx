import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactUserSessionSummary } from '.';

const meta: Meta<typeof ContactUserSessionSummary> = {
  title: 'Atoms/ContactUserSessionSummary',
  component: ContactUserSessionSummary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContactUserSessionSummary>;

const sampleSessions = [
  {
    title: 'Summer Getaway',
    date: 'Aug 15-20, 2023',
    roomCount: 1,
    events: ['Beach Dinner', 'Spa Day'],
    revenue: '$2,450',
    isPast: true,
  },
  {
    title: 'Business Conference',
    date: 'Oct 5-7, 2023',
    roomCount: 1,
    events: ['Conference Room A', 'Welcome Dinner'],
    revenue: '$1,850',
    isPast: true,
  },
  {
    title: 'Winter Holiday',
    date: 'Dec 23-27, 2023',
    roomCount: 2,
    events: ['Christmas Gala', 'Ski Package'],
    revenue: '$3,200',
  },
  {
    title: 'Spring Stay',
    date: 'Apr 12-15, 2024',
    roomCount: 1,
    events: ['Spa Treatment', 'Restaurant Reservation'],
    revenue: '$1,800',
  },
];

export const Default: Story = {
  args: {
    sessions: sampleSessions,
  },
};

export const Collapsed: Story = {
  args: {
    sessions: sampleSessions,
    collapsed: true,
  },
};

export const PastStaysOnly: Story = {
  args: {
    sessions: sampleSessions.filter(session => session.isPast),
  },
};

export const PastStaysCollapsed: Story = {
  args: {
    sessions: sampleSessions.filter(session => session.isPast),
    collapsed: true,
  },
};

export const FutureStaysOnly: Story = {
  args: {
    sessions: sampleSessions.filter(session => !session.isPast),
  },
};

export const FutureStaysCollapsed: Story = {
  args: {
    sessions: sampleSessions.filter(session => !session.isPast),
    collapsed: true,
  },
}; 
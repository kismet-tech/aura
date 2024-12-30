import type { Meta, StoryObj } from '@storybook/react';
import { ContactName } from '.';

const meta: Meta<typeof ContactName> = {
  title: 'Atoms/ContactName',
  component: ContactName,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactName>;

export const Host: Story = {
  args: {
    firstName: 'John',
    lastName: 'Smith',
    type: 'Host',
  },
};

export const Attendee: Story = {
  args: {
    firstName: 'Jane',
    lastName: 'Doe',
    type: 'Attendee',
  },
};

export const KismetEnhancedHost: Story = {
  args: {
    firstName: 'John',
    lastName: 'Smith',
    type: 'Host',
    isKismetEnhanced: true,
  },
};

export const KismetEnhancedAttendee: Story = {
  args: {
    firstName: 'Jane',
    lastName: 'Doe',
    type: 'Attendee',
    isKismetEnhanced: true,
  },
}; 
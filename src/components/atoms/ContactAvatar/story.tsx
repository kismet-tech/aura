import type { Meta, StoryObj } from '@storybook/react';
import { ContactAvatar } from '.';

const meta: Meta<typeof ContactAvatar> = {
  title: 'Atoms/ContactAvatar',
  component: ContactAvatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactAvatar>;

export const WithInitials: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: 40,
  },
};

export const WithImage: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: 40,
    dataSources: [
      {
        type: 'LinkedIn',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John%20Doe',
      },
    ],
  },
};

export const LargeSize: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: 80,
    dataSources: [
      {
        type: 'LinkedIn',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John%20Doe',
      },
    ],
  },
};

export const NoName: Story = {
  args: {
    size: 40,
  },
}; 
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContactBio } from '.';

const meta: Meta<typeof ContactBio> = {
  title: 'Atoms/ContactBio',
  component: ContactBio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContactBio>;

const sampleBio = `Vegetarian with nut allergy.
Prefers king bed on high floor, temperature at 72°F.
Requires wheelchair accessibility.
Special requests: Extra pillows, late check-out.`;

export const Default: Story = {
  args: {
    bio: sampleBio,
  },
};

export const Editable: Story = {
  args: {
    bio: sampleBio,
    onEdit: (updatedBio) => {
      console.log('Bio updated:', updatedBio);
    },
  },
};

export const ShortBio: Story = {
  args: {
    bio: 'Early check-in requested. Queen bed preferred.',
  },
}; 